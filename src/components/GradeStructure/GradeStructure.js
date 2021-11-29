import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from 'react';
import React from 'react';
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { AiOutlineSave } from 'react-icons/ai';

import './GradeStructure.css'


function GradeStructure(props) {
    const [gradeStructure, setGradeStructure] = useState([])
    const [namePointAdd, setNamePointAdd] = useState('');
    const [maxPointAdd, setMaxPointAdd] = useState(0.0);
    useEffect(() => {
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        };
        axios.get('http://localhost:8002/api/v1/classroom/grade/' + props.class, { headers })
            .then(response => {
                if (response.data.data) {
                    console.log(response.data.data)
                    setGradeStructure(response.data.data)
                }
            });
    }, [props.class])
    const handleDragEnd = (e) => {
        if (!e.destination) return;
        let tempData = Array.from(gradeStructure);
        let [source_data] = tempData.splice(e.source.index, 1);
        tempData.splice(e.destination.index, 0, source_data);
        setGradeStructure(tempData);
    }
    const handleAddGradeStructure = () => {
        const gradeItem = {
            "name": namePointAdd,
            "maxPoint": parseFloat(maxPointAdd),
            "classroomId": parseInt(props.class),
            "ordinalNumber": gradeStructure.length + 1
        }
        console.log(gradeItem);
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        axios.post('http://localhost:8002/api/v1/classroom/grade/add', gradeItem, { headers })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 1) {
                    const newGradeStructure = [...gradeStructure, { "name": namePointAdd, "maxPoint": maxPointAdd }]
                    setGradeStructure(newGradeStructure);
                }
            })
            .catch(function (error) {
                return error
            })
        setMaxPointAdd(0);
        setNamePointAdd('');
    }

    return <div> <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-1">
            {(provider) => (
                <div
                    className="text-capitalize"
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                >
                    {gradeStructure?.map((gradeItem, index) => (
                        <div key={gradeItem.name}>
                            <Draggable
                                key={gradeItem.name}
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
                                                value={gradeItem.name}
                                                className="nameInput"
                                            />
                                            <TextField
                                                name="maxPoint"
                                                label="Max point"
                                                sx={{ mt: 3 }}
                                                required
                                                value={gradeItem.maxPoint}
                                            />
                                        </span>
                                        <Button
                                            sx={{ mt: 3, ml: 2 }}
                                            color="primary"
                                            type="submit"
                                            variant="outlined"
                                            key={"save" + gradeItem.name}
                                            id="saveButton"
                                        >
                                            <AiOutlineSave />
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
            required
            className="nameInput"
            value={namePointAdd}
            onChange={(e) => { setNamePointAdd(e.target.value) }}
        />
        <TextField
            name="maxPointAdd"
            label="Max point"
            sx={{ mt: 3 }}
            required
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