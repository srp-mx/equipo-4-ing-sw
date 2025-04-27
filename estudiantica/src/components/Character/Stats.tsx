import { RootState } from "@/constants/store";
import { ArrowBigUpDash, BicepsFlexed, Brain, Cat, Heart, Shield } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";


export default function Stats(){
    const dataCharacter = useSelector((state: RootState) => state.dataCharacter);
    const stats = useSelector((state: RootState) => state.stats);

    return (
        <div className="flex flex-col space-y-1.5">
            <p className="text-center text-21xl"> Stats </p>
            <div className="flex flex-row justify-between ml-5 mr-5">
                    <div className="flex flex-row">
                        <Heart color="red" className="mr-1 stroke-3"/>
                        HP
                    </div>
                    {dataCharacter.dataCharacter.hp}
            </div>
            <div className="flex flex-row justify-between ml-5 mr-5">
                    <div className="flex flex-row">
                        <ArrowBigUpDash className="mr-1"/>
                        Level
                    </div>
                    {stats.stats.level}
            </div>

            <hr className="bg-black/20 h-1 border-0"/>

            <div className="flex flex-row justify-between ml-5 mr-5">
                    <div className="flex flex-row">
                        <BicepsFlexed color="#8ff0a4" className="mr-1"/>
                        Strength
                    </div>
                    {stats.stats.skills.strength}
            </div>

            <div className="flex flex-row justify-between ml-5 mr-5">
                    <div className="flex flex-row">
                        <Shield color="#99c1f1" className="mr-1"/>
                        Defense
                    </div>
                    {stats.stats.skills.defense}
            </div>


            <div className="flex flex-row justify-between ml-5 mr-5">
                    <div className="flex flex-row">
                        <Brain color="#f66151" className="mr-1"/>
                        Intelligence
                    </div>
                    {stats.stats.skills.intelligence}
            </div>


            <div className="flex flex-row justify-between ml-5 mr-5">
                    <div className="flex flex-row">
                        <Cat color="#cdab8f" className="mr-1"/>
                        Heart
                    </div>
                    {stats.stats.skills.heart}
            </div>

        </div>
    );

}