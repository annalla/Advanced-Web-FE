import React, { useState } from "react";
import { ClassList } from "../../components/Class/ClassList";
import { Nav } from "../../components/Layout/Nav";
import { Fragment } from "react";
export default function Home() {
  const t = true;
  const f = false;
  return (
    <Fragment>
      <Nav />
      <ClassList isTeaching={t} />
      <ClassList isTeaching={f} />
    </Fragment>
  );
}
