import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/es';
import { Assigment } from '@/Object/Assigment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/constants/store';
import { setAssignments } from '@/constants/assignmentSlice';
import AssigmentCard from '../AssigmentView/AssigmentCard';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.locale('es');

async function getWorks() : Promise<Assigment[]>{
    try{
        const response = await fetch("http://localhost:3000/all_assignment",{
            method: "GET", 
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        });

        if(!response.ok){
            const error = await response.json();
            console.error("El error es ", error);
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        } 
        const data = await response.json();
        const assignments : Assigment[] = data; 
        
        return assignments; 
    }catch(error){
        console.error("Error ", error); 
        throw error;
    }
}

function getWorksByDate(date: dayjs.Dayjs, assigments : Assigment[]) : Assigment[]{
    return assigments.filter((assigment) => {
        const assigmentDate = dayjs(assigment.due_date);
        return assigmentDate.month() === date.month() && assigmentDate.year() === date.year() && date.date() === assigmentDate.date();
    });
}

function viewAssigmentDay(assigments : Assigment[]) {
  let view = assigments.length > 2 ? assigments.slice(0, 2) : assigments;
  return (
    <div className='flex-col items-center'>
      {view.map((assigment) => (
        <div key={assigment.id}
          className='flex items-center my-1 px-2 py-1'
        >
          {
            assigment.optional ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Alert-Triangle-2--Streamline-Pixel" height="24" width="24"><desc>Interface Essential Alert Triangle 2 Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-alert-triangle-2</title><g><path d="M22.86 18.285h-1.1475v-2.2874999999999996h-1.1400000000000001v-2.2800000000000002H19.424999999999997v-2.2874999999999996h-1.1400000000000001v-2.2874999999999996h-1.1400000000000001V6.855h-1.1475V4.5675h-1.1400000000000001V2.2874999999999996h-1.1400000000000001V1.1400000000000001h-1.1475V0h-1.1400000000000001v1.1400000000000001h-1.1475v1.1475h-1.1400000000000001v2.2800000000000002h-1.1400000000000001v2.2874999999999996H6.855v2.2874999999999996H5.715v2.2874999999999996H4.5675v2.2874999999999996H3.4275v2.2800000000000002H2.2874999999999996v2.2874999999999996H1.1400000000000001v2.2874999999999996H0v2.2874999999999996h1.1400000000000001V24h21.72v-1.1400000000000001H24v-2.2874999999999996h-1.1400000000000001Zm-8.0025 2.2874999999999996h-1.1400000000000001v1.1400000000000001h-3.435v-1.1400000000000001h-1.1400000000000001v-3.4275h1.1400000000000001v-1.1475h3.435v1.1475h1.1400000000000001Zm0 -8.0025h-1.1400000000000001v2.2874999999999996h-3.435v-2.2874999999999996h-1.1400000000000001v-4.5675h1.1400000000000001V6.855h3.435v1.1475h1.1400000000000001Z" fill="#bf3939" stroke-width="0.75"></path><path d="M12.57 9.1425h1.1475v2.2874999999999996h-1.1475Z" fill="#bf3939" stroke-width="0.75"></path><path d="M11.43 8.0025h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#bf3939" stroke-width="0.75"></path></g></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Bookmark_1--Streamline-Pixel" height="24" width="24"><desc>Interface Essential Bookmark_1 Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-bookmark_1</title><g><path d="m14.857499999999998 8.0025 0 -4.5675 -1.1400000000000001 0 0 19.424999999999997 1.1400000000000001 0 0 -13.71 6.855 0 0 -6.862500000000001 -1.1400000000000001 0 0 5.715 -5.715 0z" fill="#000000" stroke-width="0.75"></path><path d="M19.4325 1.1475h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#000000" stroke-width="0.75"></path><path d="M14.857499999999998 2.2874999999999996h1.1400000000000001v1.1475h-1.1400000000000001Z" fill="#000000" stroke-width="0.75"></path><path d="M12.57 22.86h1.1475V24h-1.1475Z" fill="#000000" stroke-width="0.75"></path><path d="M11.43 21.72h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#000000" stroke-width="0.75"></path><path d="M10.290000000000001 20.572499999999998h1.1400000000000001v1.1475h-1.1400000000000001Z" fill="#000000" stroke-width="0.75"></path><path d="m11.43 6.862500000000001 -2.2874999999999996 0 0 1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -2.2874999999999996 0 0 1.1400000000000001 -1.1400000000000001 0 0 2.2874999999999996 1.1400000000000001 0 0 1.1400000000000001 1.1400000000000001 0 0 1.1475 1.1475 0 0 1.1400000000000001 1.1400000000000001 0 0 -1.1400000000000001 1.1475 0 0 -1.1475 1.1400000000000001 0 0 -1.1400000000000001 1.1400000000000001 0 0 -2.2874999999999996 -1.1400000000000001 0 0 -1.1400000000000001z" fill="#000000" stroke-width="0.75"></path><path d="M9.1425 19.4325h1.1475v1.1400000000000001h-1.1475Z" fill="#000000" stroke-width="0.75"></path><path d="M8.0025 18.2925h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#000000" stroke-width="0.75"></path><path d="M6.855 19.4325h1.1475v1.1400000000000001H6.855Z" fill="#000000" stroke-width="0.75"></path><path d="m5.715 1.1475 10.2825 0 0 1.1400000000000001 1.1475 0 0 -1.1400000000000001 2.2874999999999996 0 0 -1.1475L5.715 0l0 1.1475z" fill="#000000" stroke-width="0.75"></path><path d="M5.715 20.572499999999998h1.1400000000000001v1.1475H5.715Z" fill="#000000" stroke-width="0.75"></path><path d="M4.574999999999999 21.72h1.1400000000000001v1.1400000000000001H4.574999999999999Z" fill="#000000" stroke-width="0.75"></path><path d="M4.574999999999999 1.1475h1.1400000000000001v1.1400000000000001H4.574999999999999Z" fill="#000000" stroke-width="0.75"></path><path d="M3.4275 22.86H4.574999999999999V24H3.4275Z" fill="#000000" stroke-width="0.75"></path><path d="M3.4275 2.2874999999999996H4.574999999999999v1.1475H3.4275Z" fill="#000000" stroke-width="0.75"></path><path d="M2.2874999999999996 3.435h1.1400000000000001v19.424999999999997H2.2874999999999996Z" fill="#000000" stroke-width="0.75"></path></g></svg>
            )
          }
          <span className="w-7/8 truncate">{assigment.name}</span>
        </div>
      ))}
      {assigments.length > 2 && (
        <div className="flex items-center my-1 px-2 py-1">
          <span className="w-7/8 truncate text-gray-400">+{assigments.length - 2} más</span>
        </div>
      )}
    </div>
  );
}


const daysShort = ['DOM', 'LUN', 'MAR', 'MIR', 'JUE', 'VIE', 'SAB'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<'day'|'month' | 'year'>('month');
  let actualDate = dayjs();

  const startDay = currentDate.startOf('month').weekday();
  const daysInMonth = currentDate.daysInMonth();
  const prevMonthDays = currentDate.subtract(1, 'month').daysInMonth();

  const handlePrev = () => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(currentDate.subtract(1, 'day'));
        break;
      case 'month':
        setCurrentDate(currentDate.subtract(1, 'month'));
        break;
      case 'year':
        setCurrentDate(currentDate.subtract(1, 'year'));
        break;
    }
  };

  const handleNext = () => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(currentDate.add(1, 'day'));
        break;
      case 'month':
        setCurrentDate(currentDate.add(1, 'month'));
        break;
      case 'year':
        setCurrentDate(currentDate.add(1, 'year'));
        break;
    }
  };

  const [loading, setLoading] = useState(true);
  const tasks = useSelector((state: RootState) => state.assignments.assignments);
  const dispatch = useDispatch();

  useEffect(() => {
      async function fetchTasks() {
          setLoading(true);
          try {
            const data = await getWorks();
            dispatch(setAssignments(data));
            setLoading(false);
          } catch (error) {
            console.error("Error fetching tasks: ", error);
            setLoading(false);
          }
      }
      fetchTasks();
  }, []);

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) =>
      currentDate.startOf('year').add(i, 'month')
    );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {months.map((month, idx) => {
          const daysInMonth = month.daysInMonth();
          const startOfMonth = month.startOf('month');
          const startDay = startOfMonth.weekday();

          const calendarDays = [];
          for (let i = startDay - 1; i >= 0; i--) {
            calendarDays.push({
              day: month.subtract(1, 'month').daysInMonth() - i,
              currentMonth: false,
            });
          }
          for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push({
              day: i,
              currentMonth: true,
            });
          }
          while (calendarDays.length % 7 !== 0) {
            calendarDays.push({
              day: calendarDays.length - daysInMonth - startDay + 1,
              currentMonth: false,
            });
          }

          return (
            <div key={idx} className="flex flex-col bg-white border rounded-lg shadow-sm p-2  hover:-translate-y-1 hover:scale-100 cursor-pointer"
                onClick={() => {
                    setCurrentDate(month)
                    setViewMode("month")
                }}
            >
              <h5 className="text-sm text-gray-900 font-semibold text-center">{month.format('MMMM YYYY')}</h5>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {daysShort.map((day) => (
                  <div key={day} className="text-xs font-medium text-[#364153] text-center">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {calendarDays.map(({ day, currentMonth }, idx) => (
                  <div
                    key={idx}
                    className={`relative inline-block text-center py-2 px-1 text-xs font-medium ${
                      currentMonth ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    <span className={`text-xs ${month.month() === actualDate.month() && day === actualDate.date()? 
                      'sm:text-white rounded-full sm:flex items-center justify-center sm:bg-[#364153]' : 
                      ''}`}>{day}</span>
                    {currentMonth && (getWorksByDate(month.date(day),tasks).length > 0) && <div className="mt-0.5 flex justify-center">
                      <span className="w-1 h-1 bg-black rounded-full"></span>
                      <span className="w-1 h-1 bg-black rounded-full"></span>
                      <span className="w-1 h-1 bg-black rounded-full"></span>
                    </div>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const calendarDays = [];

    for (let i = startDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: prevMonthDays - i,
        currentMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        currentMonth: true,
      });
    }

    while (calendarDays.length % 7 !== 0) {
      calendarDays.push({
        day: calendarDays.length - daysInMonth - startDay + 1,
        currentMonth: false
      });
    }

    return (
      <>
        <div className="grid grid-cols-7 rounded-t-3xl border-b border-[#364153] ">
          {daysShort.map((day) => (
            <div
              key={day}
              className="py-2 md:py-3.5 md:rounded-t-2xl bg-[#1A1538] flex items-center justify-center text-sm font-medium text-white"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 rounded-b-xl">
          {calendarDays.map(({ day, currentMonth }, idx) => (
            <div
              key={idx}
              className={`flex-col aspect-square p-1.5 md:p-3.5 border-r border-b border-[#364153] ${
                currentMonth ? 'cursor-pointer bg-[#ffffff] text-gray-900 ' : 'bg-[#ffffe6] text-gray-600'
              } ${idx % 7 === 6 ? 'border-r-0' : ''}`}
              onClick={() => {
                if (currentMonth) {
                  setCurrentDate(currentDate.date(day));
                  setViewMode('day');
                }
              }}
            >
              <span className={`text-xs ${day === actualDate.date() && actualDate.month() === currentDate.month()? 
                'sm:text-white sm:w-6 sm:h-6 rounded-full sm:flex items-center justify-center sm:bg-[#364153]' : ''}`}>{day}</span>
              <div className="flex-row justify-center h-1/2">
                {
                  currentMonth && viewAssigmentDay(getWorksByDate(currentDate.date(day), tasks))
                }
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderDayView = () => {
    let assigments = getWorksByDate(currentDate, tasks);
    return (
      <div className="mt-2 mb-3">
          {assigments.length > 0 ? (
              <ul id="results-list" className="space-y-4">
                  {assigments.map((task) => (
                      <li key={task.id} className="p-3 rounded flex items-center transition space-x-5">                     
                          <AssigmentCard assigment={task} onOpen={() => undefined} />
                      </li>
                  ))}
              </ul>
          ) : (
              <div className="w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600">
                  <span className="text-white text-lg font-semibold">No hay tareas</span>
              </div>
          )}
      </div>
    );
  }


  return (
    <div className="rounded-2xl w-full h-full">
      <div className="flex flex-col sm:flex-row items-center justify-between bg-[#364153] rounded-2xl p-2 md:p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-semibold title-section">Calendario</span>
            <h5 className="text-sm md:text-xl leading-8 font-semibold title-section">
              {viewMode === 'year'
                ? currentDate.format('YYYY')
                : viewMode === 'month' 
                ? currentDate.format('MMMM YYYY')
                : currentDate.format('DD MMMM YYYY')}
            </h5>
          </div>
          <div className={`flex items-center ${loading ? 'hidden' : ''}`}>
            <button 
                onClick={handlePrev}
                className="rounded transition-all duration-300 text-[#cbda3d] hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
            <button 
                onClick={handleNext}
                className="rounded transition-all duration-300 text-[#cbda3d] hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
            <button 
                onClick={() => {
                    setViewMode('month')
                    setCurrentDate(dayjs())
                }}
                className='py-2 px-5 ml-5 font-medium flex pixel-corner-button bg-[#cbda3d] text-[#37123B]'
                style={{ "--pixel-bg": "#364153", "--pixel-hover-bg" : "#FFFFFF"} as React.CSSProperties}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="Interface-Essential-Calendar-Appointment--Streamline-Pixel" height="20" width="20"><desc>Interface Essential Calendar Appointment Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-calendar-appointment</title><g><path d="m1.428125 6.66875 17.14375 0 0 12.38125 0.95 0 0 -15.237499999999999 -0.95 0 0 1.9 -17.14375 0 0 -1.9 -0.95 0 0 15.237499999999999 0.95 0 0 -12.38125z" fill="#37123b" stroke-width="0.625"></path><path d="M17.621875 2.85625h0.95V3.8125h-0.95Z" fill="#37123b" stroke-width="0.625"></path><path d="M1.428125 19.05h17.14375V20H1.428125Z" fill="#37123b" stroke-width="0.625"></path><path d="m15.715625 11.431249999999999 -1.90625 0 0 0.95 -0.95 0 0 -0.95 -1.90625 0 0 0.95 -0.95 0 0 1.90625 0.95 0 0 0.95 0.95 0 0 0.95 0.95625 0 0 0.95625 0.95 0 0 -0.95625 0.95 0 0 -0.95 0.95625 0 0 -0.95 0.95 0 0 -1.90625 -0.95 0 0 -0.95z" fill="#37123b" stroke-width="0.625"></path><path d="M14.759374999999999 8.568750000000001h0.95625v0.95625h-0.95625Z" fill="#37123b" stroke-width="0.625"></path><path d="M10.953125 8.568750000000001h0.95v0.95625h-0.95Z" fill="#37123b" stroke-width="0.625"></path><path d="M7.140625 16.1875h0.95625v0.95625h-0.95625Z" fill="#37123b" stroke-width="0.625"></path><path d="M7.140625 12.38125h0.95625v0.95h-0.95625Z" fill="#37123b" stroke-width="0.625"></path><path d="M7.140625 8.568750000000001h0.95625v0.95625h-0.95625Z" fill="#37123b" stroke-width="0.625"></path><path d="M3.334375 16.1875h0.95v0.95625h-0.95Z" fill="#37123b" stroke-width="0.625"></path><path d="M3.334375 12.38125h0.95v0.95h-0.95Z" fill="#37123b" stroke-width="0.625"></path><path d="M3.334375 8.568750000000001h0.95v0.95625h-0.95Z" fill="#37123b" stroke-width="0.625"></path><path d="m5.240625 2.85625 0 0.95625 0.95 0 0 -0.95625 7.6187499999999995 0 0 0.95625 0.95 0 0 -0.95625 2.8625 0 0 -0.95 -2.8625 0 0 -1.90625 -0.95 0 0 1.90625 -7.6187499999999995 0 0 -1.90625 -0.95 0 0 1.90625 -2.85625 0 0 0.95 2.85625 0z" fill="#37123b" stroke-width="0.625"></path><path d="M1.428125 2.85625h0.95625V3.8125h-0.95625Z" fill="#37123b" stroke-width="0.625"></path></g></svg>
                <span className="hidden md:block ml-2">Hoy</span>
            </button>
          </div>
        </div>
        <div className={`flex items-center text-[#37123B] ${loading ? 'hidden' : ''}`}>
          {['day','month', 'year'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as typeof viewMode)}
              className={`p-2.5 md:py-2.5 md:px-5 text-sm font-medium ml-2 transition-all duration-300 pixel-corner-button ${
                viewMode === mode
                  ? 'bg-white'
                  : 'bg-[#CBDA3D]'
              }`}
              style={{ "--pixel-bg": "#364153", "--pixel-hover-bg" : "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-2 mb-3 h-3/4 mt-8 overflow-y-auto">
            <div id="loading-skeleton" className="space-y-4">
                <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
            </div>
        </div>
      ) : (
        <div className="h-16/20 mt-2 w-full overflow-y-auto">
          {viewMode === 'year' && renderYearView()}
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'day' && renderDayView()}
        </div>
      )}
    </div>
  );
};

export default Calendar;