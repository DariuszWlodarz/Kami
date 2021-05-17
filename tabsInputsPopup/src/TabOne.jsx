import React from 'react'

class TabOne extends React.Component {
  constructor() {
    super()
    this.state = {
      textInputValue: '',
      numberInputValue: 0,
      emailInputValue: 'email',
      checkboxState: true,
      radioValue: 'value1',
      textInputError: '',
      numberInputError:''
    }
  }

  onTextInputChange = (e) => {
    if(e.target.value.length > 4) {
      this.setState({textInputError: 'za duzo znakow'})
    } else if (e.target.value.length < 3){
      this.setState({textInputError: 'za malo znakow'})
    } else {
      this.setState({textInputError: ''})
    }
    this.setState({textInputValue: e.target.value})

  }
  onNumberInputValue = (e) => {
    console.log(e.target.value)
    if (e.target.value < 10) {
      this.setState({numberInputError: 'za mala liczba'})
    } else
    if (e.target.value > 12) {
      this.setState({numberInputError: 'za duza liczba'})
    } else {
      this.setState({numberInputError: ''})
    }

    this.setState({numberInputValue: e.target.value})
    }

  onEmailInputValue = (e) => {
    this.setState({emailInputValue: e.target.value})
  }

  onCheckbox = (e) => {
    this.setState({checkboxState: e.target.checked})
  }

  onRadioChange = (e) => {
    this.setState({radioValue: e.target.value})
  }
  render() {
    return (
      <div className="inputs">
        <input type="text" value={this.state.textInputValue} onChange={this.onTextInputChange}/>
        {this.state.textInputError && <p className="error textInputError">{this.state.textInputError}</p>}
        <input type="number" value={this.state.numberInputValue} onChange={this.onNumberInputValue}/>
        {this.state.numberInputError && <p className="error textInputError">{this.state.numberInputError}</p>}
        <input type="email" value={this.state.emailInputValue} onChange={this.onEmailInputValue}/>
        <input id="checkboxid" type="checkbox" className="inputcheckbox" onChange={this.onCheckbox} defaultChecked={this.state.checkboxState}/>
        <label htmlFor="checkboxid" className="labelcheckbox">checkbox click</label>
        <input type="radio" value="value1" name="group" onChange={this.onRadioChange} defaultChecked={this.state.radioValue === "value1"}/>
        <input type="radio" defaultChecked={this.state.radioValue === "value2"} value="value2" name="group" onChange={this.onRadioChange}/>
        <button>submit</button>
      </div>
    )
  }
}

export default TabOne
