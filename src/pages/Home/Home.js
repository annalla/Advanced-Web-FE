import React from "react";
import { ClassList } from "../../components/Class/ClassList";
import { Nav } from "../../components/Layout/Nav";
import { Fragment } from "react";
export default function Home() {
  return (
    <Fragment>
      <Nav />
      <ClassList />
    </Fragment>
  );
}
