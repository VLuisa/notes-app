import '../style.scss';
import React, { Component } from 'react';
const Immutable = require('immutable');

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
  }
  createNewNote(title) {
    const note = {
      title,
      x: 100,
      y: 100,
      text: 'note text',
    };
    this.setState({
      notes: this.state.notes.set(title, note),
    });
  }
  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }
  displayNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return <NoteComponent id={id} note={note} onDelete={this.deleteNote} onUpdateNote={this.updateNote} />;
    });
  }
  updateNote(id, event) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text: event.target.value }); }),
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
