import { useState } from 'react'
import CreateClassModal from '../ClassView/CreateClassModal'
import { useDispatch } from 'react-redux';
import { removeClass } from '@/constants/classSlice';



export default function BottonResultBar({ selection, onClickCard }: { selection: Array<number>, onClickCard: (valor: boolean) => void }): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const selectedfetch = async (selection: number[]) => {
    for (const ids of selection) {
      try {
        const response = await fetch("http://localhost:3000/delete_class", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: ids })
        });
        if (!response.ok) {
          const error = await response.text();
          if (error === "") {
            console.error("Respuesta vacía del servidor");
            throw new Error("Respuesta vacía del servidor");
          }
          console.error("El error es ", error);
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        dispatch(removeClass(ids));
      } catch (error) {
        console.error(error);
      }

    }
  };

  return (
    <div className="flex space-x-2">
      <div className={selection.length > 0 ? "flex space-x-2 text-white" : "hidden"}>
        <button
          className="flex px-3 py-2 text-sm md:text-lg bg-red-600 font-bold rounded-full hover:bg-red-500"
          onClick={() => selectedfetch(selection)}>
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" id="Interface-Essential-Bin--Streamline-Pixel" height="25" width="25">
            <g>
              <path d="m20.23828125 6.546875000000001 0 13.093750000000002 1.1953125 0 0 -13.093750000000002 2.375 0 0 -1.1875 -1.1875 0 0 -1.1953125 -4.765625 0 0 -2.3828125 -1.1875 0 0 2.3828125 -8.3359375 0 0 -2.3828125 -1.1875 0 0 2.3828125 -4.7578125 0 0 1.1953125 -1.1953125 0 0 1.1875 2.3828125 0 0 13.093750000000002 1.1875 0 0 -13.093750000000002 15.476562499999998 0z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M19.05078125 19.640625h1.1875v3.5703125h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M5.95703125 23.2109375h13.093750000000002v1.1953125H5.95703125Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M16.66796875 8.9296875h1.1875v9.5234375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M15.480468750000002 18.453125h1.1875v2.375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M11.91015625 8.9296875h1.1875v11.8984375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M8.33203125 0.59375h8.3359375v1.1875h-8.3359375Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M8.33203125 18.453125h1.1953125v2.375h-1.1953125Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M7.14453125 8.9296875h1.1875v9.5234375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
              <path d="M4.76171875 19.640625h1.1953125v3.5703125h-1.1953125Z" fill="#ffffff" stroke-width="0.7813"></path>
            </g>
          </svg>
          Borrar
        </button>
      </div>
      <div className={selection.length > 0 ? "hidden" : "flex space-x-2"}>
        <button
          className="flex px-3 py-2 text-sm md:text-lg bg-green-600 font-bold rounded-full hover:bg-green-500 text-white"
          onClick={() => { setIsModalOpen(true); onClickCard(false); }}
        >
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Bookmark--Streamline-Pixel" height="24" width="24"><desc>Interface Essential Bookmark Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-bookmark</title><g><path d="M22.86 3.4275H24v18.285h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M21.7125 21.7125h1.1475v1.1475h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M21.7125 2.2874999999999996h1.1475v1.1400000000000001h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M2.2874999999999996 22.86h19.424999999999997V24H2.2874999999999996Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 18.285h14.857499999999998v1.1475H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 13.7175h14.857499999999998v1.1400000000000001H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.7175 9.1425h5.715v1.1400000000000001h-5.715Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.7175 5.715h5.715v1.1400000000000001h-5.715Z" fill="#ffffff" stroke-width="0.75"></path><path d="M5.715 2.2874999999999996v7.995h1.1400000000000001v-1.1400000000000001h1.1475v-1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1475V2.2874999999999996h10.2825V1.1400000000000001H10.2825V0H3.4275v1.1400000000000001H1.1400000000000001v1.1475Zm2.2874999999999996 -1.1475h1.1400000000000001v1.1475h1.1400000000000001V4.574999999999999h-1.1400000000000001V2.2874999999999996h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M1.1400000000000001 21.7125h1.1475v1.1475H1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M0 2.2874999999999996h1.1400000000000001v19.424999999999997H0Z" fill="#ffffff" stroke-width="0.75"></path></g></svg>
          Agregar Clase
        </button>
        <CreateClassModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); onClickCard(true) }} />
      </div>
    </div>
  );
}