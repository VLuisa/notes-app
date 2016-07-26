import '../style.scss';
import React, { Component } from 'react';
const Immutable = require('immutable');
import * as firebase from '../firebasedb';

import TitleInput from './titleInput';
import NoteComponent from './NoteComponent';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
    };
    this.createNewNote = this.createNewNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }
  componentDidMount() {
    firebase.subscribeToNotes((notes) => this.setState({ notes: Immutable.Map(notes) }));
  }
  createNewNote(title) {
    const note = {
      title,
      x: 20,
      y: 20,
      text: '',
    };
    firebase.createNote(note);
  }

  deleteNote(id) {
    firebase.removeNote(id);
  }
  updateNote(id, fields) {
    firebase.updateNote(id, fields);
  }
  displayNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return <NoteComponent id={id} note={note} onDelete={this.deleteNote} updateNote={this.updateNote} key={id} />;
    });
  }
  render() {
    return (
      <div>
        <TitleInput onCreateClick={this.createNewNote} />
        {this.displayNotes()}
      </div>
    );
  }
}

export default App;
