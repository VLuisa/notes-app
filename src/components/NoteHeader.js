import React from 'react';
let FontAwesome = require('react-fontawesome');
// import React, { Component } from 'react';

const NoteHeader = () => {
  return (
    <div id="note_header">
      <div id="align_left">
        Note title
        <FontAwesome id="fa-icon"
          className="fa-trash"
          name="trash"
        />
        <FontAwesome id="fa-icon"
          className="pencil"
          name="pencil"
        />
      </div>
      <div id="alignright">
        <FontAwesome
          className="arrows-alt"
          name="arrows-alt"
        />
      </div>
    </div>
    );
};

export default NoteHeader;
