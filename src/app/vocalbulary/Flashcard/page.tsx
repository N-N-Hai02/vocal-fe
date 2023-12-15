"use client"
import React, { useState, useEffect, useContext } from "react";
import "./CardsStyles.css";
import { DataContexts } from "@/context/dataContext";
import { levelVocal } from '@/contants/level'
import { UserContext } from "@/context/UserContext";

export default function VocalbularyFlashcard() {
    const { data, setLevelEnglish } = useContext(DataContexts)
    const { user } = useContext(UserContext)
    const [flashcarddata, setFlashcarddata] = useState<[]>([]);

    useEffect(() => setLevelEnglish(1), [])

    useEffect(() => {
        setFlashcarddata(data)
    }, [data]);

    const cards = flashcarddata.map((card: any, index: number) => <Card card={card} key={index} />)
    const [current, setCurrent] = useState(0)
    const previousCard = () => setCurrent(current - 1)
    const nextCard = () => setCurrent(current + 1)

    if (user.isLoading) return <></>

    return (
        <div className="h-100">
            <div className="card rounded-0 m-4">
                <h5 className="card-header text-uppercase">FlashCard Vocalbulary</h5>
                <div className="card-body">
                    <div className="row input-group mb-3 text-center">
                        <div className="col-12 col-sm-4 alert alert-primary mx-3">
                            <label className="my-2 fw-bold text-warning">Level - english</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setLevelEnglish(+e.target.value)}
                            >
                                {levelVocal[0]?.map((item: any, index: number) => <option value={item.id} key={index}>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="text-center d-flex justify-content-center">
                        {
                            flashcarddata && flashcarddata.length > 0
                                ? cards[current]
                                : "loading.........!"
                        }
                    </div>
                    {
                        flashcarddata && flashcarddata.length > 0
                            ? <div className="flashcardNumber">Card {current + 1} of {flashcarddata.length}</div>
                            : ""
                    }
                    <hr />
                    <div className="d-flex justify-content-center">
                        <div className="navFlashcard">
                            {
                                current > 0
                                    ? <button onClick={previousCard}>Back</button>
                                    : <button className="flashcardDisabled" disabled> Back</button>
                            }
                            {
                                current < flashcarddata.length - 1
                                    ? <button onClick={nextCard}>Next</button>
                                    : <button className="flashcardDisabled" disabled>Next</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Card({ card }: any) {
    const [side, setSide] = useState<any>();
    function handleClick() {
        console.log("clicked!");
        setSide(!side);
        console.log(side);
    }
    return (
        <div className={`card_flash ${side ? "side_flash" : ""}`} onClick={handleClick}>
            <div className="position-absolute top-0 end-0 mt-4 me-4">
                <button className="btn btn-outline-warning">
                    <i className="fas fa-star"></i>
                </button>
            </div>
            <small>
                <span>{card.levelId}</span>
            </small>
            <div className="front text-center">
                <h1>{card.en.trim()}</h1>
                <div>{card.spelling.trim()}</div>
                <div>{card.pronunciation.trim()}</div>
            </div>
            <div className="back text-center">
                <h1>{card.vn.trim()}</h1>
                <div>{card.example_vn.trim()}</div>
                <div>{card.example_en.trim()}</div>
            </div>
        </div>
    );
}