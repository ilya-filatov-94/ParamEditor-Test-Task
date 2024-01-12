import React from 'react';
import './styles/App.css';
import stylesParamEditor from './ParamEditor/ParamEditor.module.css';
import stylesBtn from './Button/Button.module.css';

interface Param {
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

interface Model {
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(this.getModel());
  }

  render() {
    return (
      <form className={stylesParamEditor.wrapperForm} onSubmit={this.handleSubmit}>
        {Object.entries(this.state).map((item) => (
          <label className={stylesParamEditor.label} key={item[0]}>
            <span>{item[1].name}</span>
            <input
              className={stylesParamEditor.input}
              name={item[1].paramId}
              type="text"
              onChange={this.handleChange}
              value={item[1].value}
            />
          </label>
        ))}
        <button className={stylesBtn.btn}>
          Вывод в консоль
        </button>
      </form>
    );
  }
}

const App: React.FC = () => {
  const paramsJSON = '[{"id": 1,"name": "Назначение"},{"id": 2,"name": "Длина"}]';
  const modelJSON = '{"paramValues":[{"paramId": 1,"value": "повседневное"},{"paramId": 2,"value": "макси"}]}';
  const model: Model = JSON.parse(modelJSON);
  const params: Param[] = JSON.parse(paramsJSON);

  return (
    <div className="App">
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;
