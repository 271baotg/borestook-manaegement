import React, { useState } from "react";
import { AddBook } from "./AddBook";
import Papa from "papaparse";
import { ImportBook } from "./ImportBook";
import { ImportBookItem } from "./utils/ImportBookItem";

export const NavigationBar: React.FC<{

}> = (props) => {
    const [userImportList, setUserImportList] = useState<ImportBookItem[]>([]);

    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-addbook-tab" data-bs-toggle="tab" data-bs-target="#nav-addbook" type="button" role="tab" aria-controls="nav-addbook" aria-selected="true">Add Book</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                    <button className="nav-link" id="nav-import-tab" data-bs-toggle="tab" data-bs-target="#nav-import" type="button" role="tab" aria-controls="nav-import" aria-selected="false">Import</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                
                <div className="tab-pane fade" id="nav-addbook" role="tabpanel" aria-labelledby="nav-addbook-tab">
                    <AddBook></AddBook>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                <div className="tab-pane fade show active" id="nav-import" role="tabpanel" aria-labelledby="nav-import-tab">
                    <ImportBook userImportList={userImportList} setUserImportList={setUserImportList}/>
                    {/* {false&&<div >
                        <label className="btn btn-warning"  htmlFor="test">test</label>
                        <input id="test" type="file" hidden
                        onChange={(e) => {handleImportCSV(e)}}></input>
                    </div>} */}
                </div>
            </div>
        </div>
    )
};
