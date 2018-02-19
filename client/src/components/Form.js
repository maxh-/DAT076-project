import React from 'react'

export default class Form extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2:""
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2:""
    })
  };
    render() {
      return(
        <form>
        <input
        className="forms"
        name='firstName'
        placeholder="Förnamn"
        value={this.state.firstName}
        onChange={e => this.change(e)}
        />
        <br />
        <input
        className="forms"
        name='lastName'
        placeholder="Efternamn"
        value={this.state.lastName}
        onChange={e => this.change(e)}
        />
        <br />
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
        type="password"
        placeholder="Lösenord"
        value={this.state.password}
        onChange={e => this.change(e)}
        />
        <br />
        <input
        className="forms"
        name ='password2'
        type ="password"
        placeholder="Återupprepa lösenord"
        value={this.state.password2}
        onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Registrera</button>
        </form>
      );
    }
}
