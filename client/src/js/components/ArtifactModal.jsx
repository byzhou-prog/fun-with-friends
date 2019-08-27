import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { artifactSwitch } from "../actions/index.js";
import { useSelector, useDispatch } from 'react-redux';
import ArtifactDetailed from "./ArtifactDetailed";


const ArtifactModal = () => {

  const dispatch = useDispatch();
  const { open, artifact } = useSelector(store => store.focusView.artifactDetailView)

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(artifactSwitch({ open: !open, artifact: false }))}
      aria-labelledby="scroll-dialog-title"
      transitionDuration= {250}
    >
      <ArtifactDetailed props={artifact} />
    </Dialog>
  );
}

export default ArtifactModal;