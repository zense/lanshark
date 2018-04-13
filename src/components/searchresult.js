import React from "react";
import { Logo } from "./logo/logo";
import { Navbar } from "./navbar/navbar";
import { Home } from "./Home";
import { Dir_list } from "./table/dir_list";

export class Results extends React.Component {
  render() {
    const { directoryListing } = this.props;

    return (
      <div className="search-result">
        <Navbar />
        <br />
        <br />
        <br />
        <Dir_list list={directoryListing} />
      </div>
    );
  }
}
