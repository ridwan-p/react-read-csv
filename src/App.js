import React, {Component} from 'react';
import './App.css';
import Papa from 'papaparse'
import {makePhoneCountry} from "./common/untils"



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data:[], key: [], file: null}
    this.handleChange = this.handleChange.bind(this)
    this.handleRender = this.handleRender.bind(this)
  }

  handleChange(e){
    const name = e.target.name
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value
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
    const {data} = this.state
    return  (
      <div className="App">
        <input type="file" name="file" onChange={this.handleChange} />
        <input type="text" placeholder="name,phone,key"/>
        <button onClick={this.handleRender}>Submit</button>

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
              data.map((item, i) => {
                const phone = makePhoneCountry(item['Phone 1 - Value'])
                return (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td> <a href={`https://wa.me/${phone.replace(/\D/g, "")}?text=Saya%20tertarik%20untuk%20membeli%20mobil%20Anda`} target="_blank" rel="noopener noreferrer">{item['Name']}</a></td>
                    <td>{phone}</td>
                    <td><button>{item['status'] || 'X'}</button></td>
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
