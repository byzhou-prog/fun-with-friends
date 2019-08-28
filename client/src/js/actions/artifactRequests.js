import { UPLOAD_IMAGE } from "../constants/action-types";
import { removeArtifact, addArtifact, getArtifacts } from "./index"


export const uploadImage = (e) => {



  const files = Array.from(e.target.files)
  const formData = new FormData()

  files.forEach((file, i) => {
    console.log(file, i)
    formData.append(i, file)
  })
  console.log(formData)
  return (formData) => {
    fetch('/api/image/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json()
        .then(json => {
          if (response.status === 201) {
            return {
              type: UPLOAD_IMAGE,
              payload: json.src
            };
          } else {
            return {
              type: UPLOAD_IMAGE,
              payload: false
            }
          };
        }));
  }
};

export const submitArtifactForm = (artifact) => {

  return (dispatch) => {
    dispatch(addArtifact(artifact))

    const request = {
      method: 'POST',
      body: JSON.stringify(artifact)
    };
    fetch('/api/artifact', request)
      .then(response => response.json()
        .then(json => {
          if (response.status !== 201) {
            console.log("FAILURE!!!!!!!!!!!!!!!!");
            console.log(json);
          }
        }
        )
      );
  };
};

export const deleteArtifact = (artifact) => {

  return (dispatch) => {
    dispatch(removeArtifact(artifact))

    const request = {
      method: 'DELETE'
    };
    fetch(`/api/artifact/${artifact.id}`, request)
      .then(response => response.json()
        .then(json => {
          if (response.status !== 200) {
            console.log("FAILURE!!!!!!!!!!!!!!!!");
            console.log(json);
          }
        }
        )
      );
  };
};

export const getAllArtifacts = () => {

  return (dispatch) => {

    const request = {
      method: 'GET'
    };
    fetch(`/api/artifact`, request)
      .then(response => response.json()
        .then(json => {
          if (response.status !== 200) {
            console.log("ERROR - NO ARTIFACTS RECEIVED GET REQUEST FAIL");
            console.log(json);
          } else {
            dispatch(getArtifacts(json))
          }
        }
        )
      );
  };
};

export const editArtifact = (artifact) => {
  return (dispatch) => {
    dispatch(removeArtifact(artifact));
    dispatch(submitArtifactForm(artifact));
  }
}


