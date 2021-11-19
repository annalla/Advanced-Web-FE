import React from "react";
// import { ClassList } from "../../components/Class/ClassList";
import { Nav2 } from "../../components/Layout/Nav2";
import { Fragment } from "react";
import { Stream } from "../../components/DetailedClass/Stream";
export default function DetailClass() {
 
  return (
    <Fragment>
      <Nav2 />
      <Stream/>
      {/* <ClassList/> */}
    </Fragment>
  );
}
