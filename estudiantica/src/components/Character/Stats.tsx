import { setPoints } from "@/constants/dataCharacterSlice";
import { setSkills } from "@/constants/StatsSlice";
import { RootState } from "@/constants/store";
import { Skills } from "@/Object/Character";
import { ArrowBigUpDash, BicepsFlexed, Brain, Cat, Heart, Shield } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "react-router-dom";


export const getPointSkill = async (dispatch: any) => {
    try {
        const response = await fetch("http://localhost:3000/character_free_skill", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error(`Bad Request ${response.body}`)
                case 401:
                    throw new Error(`Unauthorized: ${response.body}`)
                case 500:
                    throw new Error(`Internal Server Error: ${response.body}`)
            }
        }
        const data = await response.json();
        dispatch(setPoints(data.points));
    } catch (error) {
        console.error("Error ", error);
    }
}



export default function Stats() {
    const dataCharacter = useSelector((state: RootState) => state.dataCharacter);
    const stats = useSelector((state: RootState) => state.stats);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [pointLeft, setPointLeft] = useState(0);
    const [tempStats, setTempStats] = useState<Skills>({
        strength: 0,
        defense: 0,
        heart: 0,
        intelligence: 0
    });

    console.log("Stats ", stats);

    useEffect(() => {
        if (stats.stats.skills && dataCharacter.points !== undefined) {
            setTempStats({
                strength: stats.stats.skills.strength,
                defense: stats.stats.skills.defense,
                heart: stats.stats.skills.heart,
                intelligence: stats.stats.skills.intelligence
            });
            setPointLeft(dataCharacter.points);
        }
    }, [stats.stats.skills, dataCharacter.points, dispatch]);

    const increaseStat = (stat: keyof typeof tempStats) => {
        if (pointLeft > 0) {
            setTempStats(prev => ({
                ...prev,
                [stat]: prev[stat] + 1,
            }));
            setPointLeft(pointLeft - 1);
        }
    };

    const decreaseStat = (stat: keyof typeof tempStats) => {
        if (tempStats[stat] > stats.stats.skills[stat]) {
            setTempStats(prev => ({
                ...prev,
                [stat]: prev[stat] - 1,
            }));
            setPointLeft(pointLeft + 1);
        }
    };


    const saveSkills = async (dispatch: any, click: () => void) => {
        try {
            const dataSend = {
                strength: tempStats.strength - stats.stats.skills.strength,
                defense: tempStats.defense - stats.stats.skills.defense,
                heart: tempStats.heart - stats.stats.skills.heart,
                intelligence: tempStats.intelligence - stats.stats.skills.intelligence
            };
            const response = await fetch("http://localhost:3000/character_add_skills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(dataSend),
            });
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error(`Error (Bad request) ${response.body}`);
                    case 401:
                        throw new Error(`Error (Unauthorized) ${response.body}`);
                    case 404:
                        throw new Error(`Error Not Found ${response.body}`);
                    default:
                        throw new Error(`Error ${response.statusText}`);
                }
            }
            const data = await response.json();
            const nuevasSkills: Skills = tempStats;
            console.log("Nuevas Skills ", nuevasSkills)
            dispatch(setSkills(nuevasSkills));
            dispatch(setPoints(pointLeft));
            click();
        } catch (error) {
            console.error("Error: ", error);
        }

    }

    if (isEdit) {
        return (
            <div className="flex flex-col justify-end mr-3 h-full" >
                <div className="bg-[#152442] text-white p-4 space-y-2.5 justify-center flex flex-col text-sm"
                >
                    <p className="text-center"> Puntos: {pointLeft} </p>

                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <Heart color="red" className="mr-1 stroke-3" />
                            <span className="hidden lg:block">HP</span>
                        </div>
                        {dataCharacter.dataCharacter.hp}
                    </div>
                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <ArrowBigUpDash className="mr-1" />
                            <span className="hidden lg:block">Nivel</span>
                        </div>
                        {stats.stats.level}
                    </div>

                    <hr className="bg-black/20 h-1 border-0" />

                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <BicepsFlexed color="#8ff0a4" className="mr-1" />
                            <span className="hidden xl:block">Fuerza</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => decreaseStat("strength")}
                                className="bg-red-500 hover:bg-red-600 text-xs text-white px-1.5 rounded-full"
                                disabled={tempStats.strength <= stats.stats.skills.strength}>
                                -
                            </button>
                            <span>{tempStats.strength}</span>
                            <button onClick={() => increaseStat("strength")}
                                className="px-2 rounded-full bg-green-500 hover:bg-green-600  text-white text-xs"
                                disabled={pointLeft <= 0}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <Shield color="#99c1f1" className="mr-1" />
                            <span className="hidden xl:block">Defensa</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => decreaseStat("defense")}
                                className="bg-red-500 hover:bg-red-600 text-xs text-white px-1.5 rounded-full"
                                disabled={tempStats.defense <= stats.stats.skills.defense}>
                                -
                            </button>
                            <span>{tempStats.defense}</span>
                            <button onClick={() => increaseStat("defense")}
                                className="px-2 rounded-full bg-green-500 hover:bg-green-600  text-white text-xs"
                                disabled={pointLeft <= 0}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <Brain color="#f66151" className="mr-1" />
                            <span className="hidden xl:block">Inteligencia</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => decreaseStat("intelligence")}
                                className="bg-red-500 hover:bg-red-600 text-xs text-white px-1.5 rounded-full"
                                disabled={tempStats.intelligence <= stats.stats.skills.intelligence}>
                                -
                            </button>
                            <span>{tempStats.intelligence}</span>
                            <button onClick={() => increaseStat("intelligence")}
                                className="px-2 rounded-full bg-green-500 hover:bg-green-600  text-white text-xs"
                                disabled={pointLeft <= 0}>
                                +
                            </button>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between ml-3 mr-3 ">
                        <div className="flex flex-row">
                            <Cat color="#cdab8f" className="mr-1" />
                            <span className="hidden xl:block">Corazon</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => decreaseStat("heart")}
                                className="bg-red-500 hover:bg-red-600 text-xs text-white px-1.5 rounded-full"
                                disabled={tempStats.heart <= stats.stats.skills.heart}>
                                -
                            </button>
                            <span>{tempStats.heart}</span>
                            <button onClick={() => increaseStat("heart")}
                                className="px-2 rounded-full bg-green-500 hover:bg-green-600  text-white text-xs"
                                disabled={pointLeft <= 0}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between text-sm space-y-2">
                        <button
                            onClick={() => saveSkills(dispatch, () => setIsEdit(false))}
                            className="pixel-corner-button mt-2 px-4 bg-[#39BF48]"
                            style={{
                                "--pixel-bg": "#152442",
                                "--pixel-hover-bg": "#39BF48",
                                "--size-pixel": "7px"
                            } as React.CSSProperties}
                        >
                            Guardar
                        </button>
                        <button
                            onClick={() => setIsEdit(false)}
                            className="pixel-corner-button mt-2 px-4 bg-[#BF3939]"
                            style={{
                                "--pixel-bg": "#152442",
                                "--pixel-hover-bg": "#BF3939",
                                "--size-pixel": "7px"
                            } as React.CSSProperties}
                        >
                            Cancelar
                        </button>
                    </div>


                </div>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col justify-end mr-3 h-full" >
                <div className="bg-[#152442] text-white p-4 space-y-2.5 justify-center flex flex-col text-sm lg:text-base rounded-lg"
                >
                    <p className="text-center"> Estadisticas </p>

                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <Heart color="red" className="mr-1 stroke-3" />
                            <span className="hidden lg:block">HP</span>
                        </div>
                        {dataCharacter.dataCharacter.hp}
                    </div>
                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <ArrowBigUpDash className="mr-1" />
                            <span className="hidden lg:block">Nivel</span>
                        </div>
                        {stats.stats.level}
                    </div>

                    <hr className="bg-black/20 h-1 border-0" />

                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <BicepsFlexed color="#8ff0a4" className="mr-1" />
                            <span className="hidden lg:block">Fuerza</span>
                        </div>
                        {stats.stats.skills.strength}
                    </div>

                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <Shield color="#99c1f1" className="mr-1" />
                            <span className="hidden lg:block">Defensa</span>
                        </div>
                        {stats.stats.skills.defense}
                    </div>


                    <div className="flex flex-row justify-between ml-3 mr-3">
                        <div className="flex flex-row">
                            <Brain color="#f66151" className="mr-1" />
                            <span className="hidden lg:block">Inteligencia</span>
                        </div>
                        {stats.stats.skills.intelligence}
                    </div>


                    <div className="flex flex-row justify-between ml-3 mr-3 mb-2">
                        <div className="flex flex-row">
                            <Cat color="#cdab8f" className="mr-1" />
                            <span className="hidden lg:block">Corazon</span>
                        </div>
                        {stats.stats.skills.heart}
                    </div>

                    {(dataCharacter?.points > 0) && (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="pixel-corner-button mt-2 px-4 bg-[#39BF48]"
                            style={{
                                "--pixel-bg": "#152442",
                                "--pixel-hover-bg": "#39BF48",
                                "--size-pixel": "10px"
                            } as React.CSSProperties}
                        >
                            Añadir
                        </button>
                    )}
                </div>
            </div>
        );
    }

}