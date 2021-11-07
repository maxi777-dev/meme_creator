import html2canvas from 'html2canvas';
import './App.css';
import { useState } from 'react';

function App() {

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [label1, setLabel1] = useState('');
  const [label2, setLabel2] = useState('');

  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangeLabel1 = function (evento) {
    setLabel1(evento.target.value)
  }

  const onChangeLabel2 = function (evento) {
    setLabel2(evento.target.value)
  }

  const onClickExport = function (evento) {
    html2canvas(document.querySelector("#meme")).then(canvas => {
      var img = canvas.toDataURL("image/png");
      var link = document.createElement('a');
      link.download = 'meme.png';
      link.href = img;
      link.click();
    });
  }

  return (
    <div>
      <h2>Meme creator v1</h2>
      <div>
        <input id="profilePic" type="file" onChange={onChangePicture} />
      </div>
      <div className="meme" id="meme">
        <span>{label1}</span> <br />
        <span>{label2}</span>
        <img className="image" src={imgData} />
      </div>
      <input
        onChange={onChangeLabel1}
        type="text"
        placeholder="Label TOP"
      />
      <input
        onChange={onChangeLabel2}
        type="text"
        placeholder="Label BUTTOM"
      />
      <button onClick={onClickExport}>Export</button>
    </div>    
  );
};

export default App;
