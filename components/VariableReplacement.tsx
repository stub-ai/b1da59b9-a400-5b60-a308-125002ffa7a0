import { useState } from 'react';

type Variables = Record<string, string>;

const VariableReplacement = () => {
  const [text, setText] = useState('');
  const [variables, setVariables] = useState<Variables>({});
  const [result, setResult] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });
  };

  const handleReplace = () => {
    let resultText = text;
    for (const variable in variables) {
      const regex = new RegExp(`{${variable}}`, 'g');
      resultText = resultText.replace(regex, variables[variable]);
    }
    setResult(resultText);
  };

  const addVariable = () => {
    const newVariableName = `variable${Object.keys(variables).length + 1}`;
    if (variables[newVariableName]) {
      alert('Variable with the same name already exists!');
      return;
    }
    setVariables({
      ...variables,
      [newVariableName]: '',
    });
  };

  const deleteVariable = (variable: string) => {
    const newVariables = { ...variables };
    delete newVariables[variable];
    setVariables(newVariables);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Variable Replacement</h1>
      <textarea
        className="w-full h-32 p-2 mb-4"
        placeholder="Enter text with placeholders..."
        value={text}
        onChange={handleTextChange}
      />
      {Object.keys(variables).map((variable) => (
        <div key={variable} className="mb-4 flex items-center">
          <input
            className="p-2 mr-2 flex-grow"
            type="text"
            name={variable}
            placeholder={variable}
            value={variables[variable]}
            onChange={handleVariableChange}
          />
          <button className="p-2 bg-red-500 text-white" onClick={() => deleteVariable(variable)}>
            Delete
          </button>
        </div>
      ))}
      <button className="p-2 bg-blue-500 text-white mb-4" onClick={addVariable}>
        Add Variable
      </button>
      <button className="p-2 bg-blue-500 text-white" onClick={handleReplace}>
        Replace Variables
      </button>
      <div className="mt-4">
        <h2 className="text-xl mb-2">Result:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default VariableReplacement;