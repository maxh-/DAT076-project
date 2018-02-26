import React from 'react'

export default class FormLogin extends React.Component {
state = {
  email: "",
  password:""
}

change = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}

onSubmit = e => {
  e.preventDefault(); //Prevent the site from reloading efter pressing register.
  this.props.onSubmit(this.state)
  this.setState({
    email: "",
    password: "",
  })
};
render() {
  return(
    <form>
    <input
    className="forms"
    name='email'
    placeholder="Email"
    value={this.state.email}
    onChange={e => this.change(e)}
    />
    <br />
    <input
    className="forms"
    name='password'
    type ="password"
    placeholder="Lösenord"
    value={this.state.pass}
    onChange={e => this.change(e)}
    />
    <br />
      <button onClick={e => this.onSubmit(e)}>Logga in</button>
      </form>
    );
  }
}
