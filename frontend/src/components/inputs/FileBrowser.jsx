import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import ModalContainer from "../ModalContainer";

import { ReactComponent as Folder } from "../../assets/folder-solid.svg";
import Button from "../buttons/Button";

function FileBrowser({ open, onClose, onSelect = () => {} }) {
  const uploadInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [currentDir, setCurrentDir] = useState("");
  const [selected, setSelected] = useState("");

  // Charger les fichiers au montage du composant
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/files`)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des fichiers", error);
      });
  }, []);

  const handleSelect = () => {
    onSelect(selected);
    onClose();
  };

  // Gérer le téléchargement de fichiers
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URI}/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Recharger la liste des fichiers
        return axios.get(`${process.env.REACT_APP_SERVER_URI}/files`);
      })
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement du fichier", error);
      });
  };

  // Gérer la sélection d'un fichier
  const handleFileSelect = (file) => {
    setSelected(file);
  };

  // Quand on sélectionne un dossier, ajouter le dossier au currentDir
  const handleDirSelect = (dir) => {
    setCurrentDir(currentDir ? `${currentDir}\\${dir}` : dir);
    setSelected(null);
  };

  const handleBreadcrumDirSelect = (dir) => {
    setCurrentDir(dir);
  };

  const dirs = files
    .map((file) => {
      // Supprimer le currentDir et le fichier de la chaîne
      const fileWithoutCurrentDir = currentDir
        ? file.replace(`${currentDir}\\`, "")
        : file;
      // Récupérer uniquement le premier sous-dossier
      const possibleDir = fileWithoutCurrentDir.split("\\")[0];
      // Vérifier que le dossier est bien dans le currentDir et n'est pas un fichier
      return file.startsWith(currentDir) && !possibleDir.includes(".")
        ? possibleDir
        : null;
    })
    .filter((dir, index, self) => dir && self.indexOf(dir) === index);

  // Filtrer les fichiers pour le dossier actuel
  const filesInCurrentDir = files.filter((file) => {
    // Récupérer le chemin du dossier de chaque fichier
    const fileDir = file.substring(0, file.lastIndexOf("\\"));
    // Comparer avec le dossier actuel
    return fileDir === currentDir;
  });

  // Créer le fil d'Ariane
  const breadcrumb = currentDir.split("\\").map((segment, index, array) => {
    const path = array.slice(0, index + 1).join("\\");
    return (
      <span
        className="pr-2"
        key={path}
        onClick={() => handleBreadcrumDirSelect(path)}
      >
        {"> "} {segment}
      </span>
    );
  });

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title="File Browser"
      className="w-5/6 h-5/6"
    >
      <div className="flex flex-col w-full">
        <div className="flex">
          <span className="pr-2" onClick={() => handleBreadcrumDirSelect("")}>
            images
          </span>
          {breadcrumb}
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-y-scroll scroll">
        <div className="grid w-full grid-cols-7 gap-2 p-8 auto-rows-min">
          {dirs.map((dir, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between p-2 rounded-lg aspect-square bg-stone-800"
              onClick={() => handleDirSelect(dir)}
            >
              <Folder className="h-12 my-auto aspect-square fill-stone-300" />
              <p className="flex overflow-hidden text-xs select-none">{dir}</p>
            </div>
          ))}
          {filesInCurrentDir.map((file, index) => (
            <div
              className={`flex rounded-lg aspect-square bg-stone-800 frame${
                selected === file ? "-selected" : ""
              }`}
              key={index}
            >
              <img
                className="object-cover w-full h-full"
                key={index}
                src={`${
                  process.env.REACT_APP_SERVER_URI
                }/files/${encodeURIComponent(file)}`}
                alt="Sélectionné"
                onClick={() => handleFileSelect(file)}
                onDoubleClick={handleSelect}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end w-full gap-4 py-8">
        <input
          className="hidden"
          ref={uploadInputRef}
          type="file"
          onChange={handleFileUpload}
        />
        <Button
          name={"Upload"}
          color="secondary"
          onClick={() => uploadInputRef.current.click()}
        />
        <Button
          disable={!Boolean(selected)}
          name={"Select"}
          onClick={handleSelect}
        />
      </div>
    </ModalContainer>
  );
}

export default FileBrowser;
