import React from "react";
import './Dropdown.css'
class DropdownComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'male'};
      this.onFormSexDrop = this.onFormSexDrop.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    onFormSexDrop = (event) => {
        this.props.onFormSexDrop(event)
    }

    handleChange(event) {
      this.setState({value: event.target.value});
      this.onFormSexDrop(event.target.value);
    }
  
    render() {
      return (
            <select id="dropdown" value={this.state.value} onChange={this.handleChange}>
              <option value="" disabled selected>Select Your Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
      );
    }
  }
  export default DropdownComp