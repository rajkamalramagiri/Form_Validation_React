import React, { Component } from "react";
import Joi from "joi";
export class App extends Component {
  state = {
    account: {
      username: "",
      email: "",
    },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .label("Email"),
  });

  handleChange = (e) => {
    const schemaDummy = {
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .label("Username"),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .label("Email"),
    };
    const validatePropery = (name, value) => {
      const obj = {
        [name]: value,
      };
      const fieldSchema = Joi.object({
        [name]: schemaDummy[name],
      });
      //return result
      const result = fieldSchema.validate(obj, {
        abortEarly: false,
      });
      return result;
      // result.error === null -> valid
    };
    let res = validatePropery(e.target.name, e.target.value);
    if (res?.error?.details || false) {
      this.setState({
        account: { ...this.state.account, [e.target.name]: e.target.value },
        errors: {
          ...this.state.errors,
          [res.error.details[0].path[0]]: res.error.details[0].message,
        },
      });
    } else {
      this.setState({
        account: { ...this.state.account, [e.target.name]: e.target.value },
        errors: {
          ...this.state.errors,
          [e.target.name]: "",
        },
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("account click", this.state.account);

    const result = this.schema.validate(this.state.account, {
      abortEarly: false,
    });
    console.log(result);
    const errors = {};
    if (result.error) {
      result.error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      console.log("error", errors);
    }
    this.setState({ errors: errors });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <span>{this.state.errors?.username || " "}</span>
        <br />
        <label>Email</label>

        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <span>{this.state.errors?.email || " "}</span>
        <button type="submit">submit</button>
      </form>
    );
  }
}

export default App;
