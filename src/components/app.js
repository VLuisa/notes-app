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
    this.updateNote = this.updateNote.bind(this);
  }
  createNewNote(title) {
    const note = {
      title,
      x: 20,
      y: 20,
      text: '',
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
  updateNote(id, fields) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }
  displayNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return <NoteComponent id={id} note={note} onDelete={this.deleteNote} updateNote={this.updateNote} key={id} />;
    });
  }
  render() {
    return (
      <div>
        {/* <ToggleTheme />*/}
        <TitleInput onCreateClick={this.createNewNote} />
        {this.displayNotes()}
      </div>
    );
  }
}

export default App;
