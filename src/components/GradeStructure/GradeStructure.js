import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from 'react';
import React from 'react';
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { AiOutlineCheck, AiFillDelete } from 'react-icons/ai';
import { CircularProgress } from '@material-ui/core';

import './GradeStructure.css'

function GradeStructure(props) {
    const [gradeStructure, setGradeStructure] = useState([])
    const [namePointAdd, setNamePointAdd] = useState('');
    const [maxPointAdd, setMaxPointAdd] = useState(0.0);
    const [isLoading, setIsLoading] = useState(false);
    const [chosenGrade, setChosenGrade] = useState({ "id": null });
    const [namePointEdit, setNamePointEdit] = useState('');
    const [maxPointEdit, setMaxPointEdit] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        };
        axios.get('http://localhost:8002/api/v1/classroom/grade/' + props.class, { headers })
            .then(response => {
                if (response.data.data) {
                    setGradeStructure(response.data.data);
                    setIsLoading(false);
                }
            });
    }, [props.class])

    const updateOrdinalNumber = (grade) => {
        setIsLoading(true);
        const gradeUpdateItem = {
            "name": grade.name,
            "maxPoint": parseFloat(grade.maxPoint),
            "id": grade.id,
            "ordinalNumber": grade.ordinalNumber
        }
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.post('http://localhost:8002/api/v1/classroom/grade/update', gradeUpdateItem, { headers })
            .then(function (response) {
                if (response.data.status === 1) {
                    const data = response.data.data;
                    const newGradeStructure = gradeStructure;
                    newGradeStructure.forEach(function (item, i) { 
                        if (item.id === data.id) {
                             item.name = data.name; item.maxPoint = data.maxPoint; item.classroomId = data.classroomId; item.ordinalNumber = data.ordinalNumber 
                        }
                    });
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                return error
            })
    }
    

    const handleDragEnd = (e) => {
        if (!e.destination) return;
        // if (e.destination.index === e.source.index) return;
        let tempData = Array.from(gradeStructure);
        let [source_data] = tempData.splice(e.source.index, 1);
        tempData.splice(e.destination.index, 0, source_data);
        setGradeStructure(tempData);
        console.log(tempData)

        // Get list ordinal number
        let listOrdinalNumber = [];
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].ordinalNumber) listOrdinalNumber.push(tempData[i].ordinalNumber);
        }

        // Sort list ordinal number
        listOrdinalNumber.sort(function(a, b){return a-b});

        // Set list ordinal number to data
        for (let i = 0; i < tempData.length; i++) {
            tempData[i].ordinalNumber = listOrdinalNumber[i];
            updateOrdinalNumber(tempData[i]);
        }
    }
    
    const handleAddGradeStructure = () => {
        setIsLoading(true);
        const gradeItem = {
            "name": namePointAdd,
            "maxPoint": parseFloat(maxPointAdd),
            "classroomId": parseInt(props.class),
            "ordinalNumber": gradeStructure.length + 1
        }
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.post('http://localhost:8002/api/v1/classroom/grade/add', gradeItem, { headers })
            .then(function (response) {
                if (response.data.status === 1) {
                    const data = response.data.data;
                    const newGradeStructure = [...gradeStructure, { "name": data.name, "maxPoint": data.maxPoint, "id": data.id, "classroomId": data.classroomId, "ordinalNumber": data.ordinalNumber }]
                    setGradeStructure(newGradeStructure);
                    setIsLoading(false)
                }
            })
            .catch(function (error) {
                return error
            })
        setMaxPointAdd(0);
        setNamePointAdd('');
    }

    const handleUpdateGradeStructure = (grade) => {
        if (grade.id !== chosenGrade.id)
            return;
        setIsLoading(true);
        const gradeUpdateItem = {
            "name": namePointEdit,
            "maxPoint": parseFloat(maxPointEdit),
            "id": chosenGrade.id,
            "ordinalNumber": chosenGrade.ordinalNumber
        }
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.post('http://localhost:8002/api/v1/classroom/grade/update', gradeUpdateItem, { headers })
            .then(function (response) {
                if (response.data.status === 1) {
                    const data = response.data.data;
                    const newGradeStructure = gradeStructure;
                    newGradeStructure.forEach(function (item, i) { 
                        if (item.id === data.id) {
                             item.name = data.name; item.maxPoint = data.maxPoint; item.classroomId = data.classroomId; item.ordinalNumber = data.ordinalNumber 
                        }
                    });
                    setNamePointEdit(data.name);
                    setMaxPointEdit(data.maxPoint);
                    setGradeStructure(newGradeStructure);
                    setIsLoading(false)
                }
            })
            .catch(function (error) {
                return error
            })
    }

    const onChoose = (item) => {
        if (item.id === chosenGrade.id)
            return;
        setChosenGrade(item);
        setNamePointEdit(item.name);
        setMaxPointEdit(item.maxPoint);
    }

    const handleDeleteGradeStructure = (gradeId) => {
        setIsLoading(true);
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.get('http://localhost:8002/api/v1/classroom/grade/delete/' + gradeId, { headers })
            .then(function (response) {
                if (response.data.status === 1) {
                    let newGradeStructure = gradeStructure;
                    newGradeStructure.splice(gradeStructure.findIndex(v => v.id === gradeId), 1);
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                return error
            })
    }
    return <div>
        {isLoading && <CircularProgress id="circularProgress"></CircularProgress>}
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable-1">
                {(provider) => (
                    <div
                        className="text-capitalize"
                        ref={provider.innerRef}
                        {...provider.droppableProps}
                    >
                        {gradeStructure?.map((gradeItem, index) => (
                            <div key={gradeItem.id} onClick={() => onChoose(gradeItem)}>
                                <Draggable
                                    key={gradeItem.id}
                                    draggableId={gradeItem.name}
                                    index={index}
                                >
                                    {(provider) => (
                                        <div {...provider.draggableProps} ref={provider.innerRef}>
                                            <span {...provider.dragHandleProps}>
                                                <TextField
                                                    name="name"
                                                    label="Name"
                                                    sx={{ mt: 3 }}
                                                    required
                                                    value={(gradeItem.id === chosenGrade.id) ? namePointEdit : gradeItem.name}
                                                    className="nameInput"
                                                    onChange={(e) => { setNamePointEdit(e.target.value) }}
                                                />
                                                <TextField
                                                    name="maxPoint"
                                                    label="Max point"
                                                    sx={{ mt: 3 }}
                                                    required
                                                    value={(gradeItem.id === chosenGrade.id) ? maxPointEdit : gradeItem.maxPoint}
                                                    onChange={(e) => { setMaxPointEdit(e.target.value) }}
                                                />
                                            </span>
                                            <Button
                                                sx={{ mt: 3, ml: 2 }}
                                                color="primary"
                                                variant="outlined"
                                                key={"save" + gradeItem.id}
                                                id="saveButton"
                                                onClick={() => handleUpdateGradeStructure(gradeItem)}
                                            >
                                                <AiOutlineCheck />
                                            </Button>
                                            <Button
                                                sx={{ mt: 3, ml: 2 }}
                                                color="primary"
                                                variant="outlined"
                                                key={"delete" + gradeItem.id}
                                                id="deleteButton"
                                                onClick={() => handleDeleteGradeStructure(gradeItem.id)}
                                            >
                                                <AiFillDelete />
                                            </Button>
                                        </div>
                                    )}
                                </Draggable>

                            </div>
                        ))}
                        {provider.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <TextField
            name="namePointAdd"
            label="Name"
            sx={{ mt: 3 }}
            className="nameInput"
            value={namePointAdd}
            onChange={(e) => { setNamePointAdd(e.target.value) }}
        />
        <TextField
            name="maxPointAdd"
            label="Max point"
            sx={{ mt: 3 }}
            value={maxPointAdd}
            onChange={(e) => { setMaxPointAdd(e.target.value) }}
        />
        <Button
            sx={{ mt: 3, ml: 2 }}
            color="primary"
            variant="outlined"
            id="saveButton"
            onClick={handleAddGradeStructure}
        >
            Add
        </Button>
    </div>
}

export default GradeStructure;