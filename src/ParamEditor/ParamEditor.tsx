import React from 'react';
import styles from './ParamEditor.module.css';

export interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  colorId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface StateItem {
  paramId: string;
  name: string;
  value: string;
}

type State = {
  [key: string]: StateItem;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    for (let i = 0; i < props.params.length; i++) {
      let key = String(props.params[i].id);
      this.state = {
        ...this.state,
        [key]: {
          paramId: key,
          name: props.params[i].name,
          value: props.model.paramValues[i].value,
        },
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.getModel = this.getModel.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value },
    }));
  }

  public getModel(): Model {
    const resultModel: Model = { paramValues: [] };
    for (let key in this.state) {
      resultModel.paramValues.push({
        paramId: Number(this.state[key].paramId),
        value: this.state[key].value,
      });
    }
    return resultModel;
  }

  render() {
    return (
      <form className={styles.wrapperForm}>
        {Object.entries(this.state).map((item) => (
          <label className={styles.label} key={item[0]}>
            <span>{item[1].name}</span>
            <input
              className={styles.input}
              name={item[1].paramId}
              type="text"
              onChange={this.handleChange}
              value={item[1].value}
            />
          </label>
        ))}
      </form>
    );
  }
}

export default ParamEditor;