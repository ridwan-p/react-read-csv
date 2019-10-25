import React, {Component} from 'react';
import './App.css';
import Papa from 'papaparse'
import {makePhoneCountry} from "./common/untils"



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data:[], keys: [], file: null}
    this.handleChange = this.handleChange.bind(this)
    this.handleRender = this.handleRender.bind(this)
  }

  handleChange(e){
    const name = e.target.name
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value.replace(/, /g, ',').split(',')
    this.setState({ [name]: value })
  }

  handleRender(e) {
    const vm = this
    // console.log(state);
    Papa.parse(vm.state.file, {
      header: true,
      complete: function(results) {
        vm.setState({data:results.data})
      }
    });
  }

  render() {
    const {data, keys} = this.state
    return  (
      <div className="App">
        <input type="file" name="file" onChange={this.handleChange} />
        <input type="text" name="keys" onChange={this.handleChange} placeholder="name,phone,key"/>
        <button onClick={this.handleRender}>Submit</button>

        <table>
          <thead>
            <tr>
              {
                keys.map(key => <th key={key}>{key}</th>)
              }
            
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) => {
                return (
                  <tr key={i}>
                    {
                      keys.map(key => <td key={key}>{key === 'phone' ? makePhoneCountry(item[key]) : item[key]}</td>)
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
