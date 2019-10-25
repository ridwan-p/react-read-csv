import React, {Component} from 'react';
import './App.css';
import Papa from 'papaparse'
import {makePhoneContry} from "./common/untils"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {contacts:[]}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    const vm = this
    Papa.parse(e.target.files[0], {
      header: true,
      complete: function(results) {
        // console.log(this)
        vm.setState({contacts:results.data})
      }
    });
  }

  render() {
    const {contacts} = this.state
    return  (
      <div className="App">
        <input type="file" name="file" onChange={this.handleChange} />

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              contacts.map((item, i) =>
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item['Name']}</td>
                  <td>{makePhoneContry(item['Phone 1 - Value'])}</td>
                  <td><button>{item['status'] || 'X'}</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
