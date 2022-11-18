import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Image from "next/image";
import arrow from "../public/arrow.png";
import Input from "./Input";
import Button from "./Button";
import defaultImage from "../public/defaultProjectImage.jpg";

const Modal = (props: {
  hasCoordinates: boolean;
  show: boolean;
  onClose: any;
  definedCoordinates?: any;
  newProject?: boolean;
  title: string;
  projectName?: string;
  dateReview?: string;
  image?: any;
  score?: number;
}) => {
  const {
    show,
    hasCoordinates,
    onClose,
    definedCoordinates,
    newProject,
    title,
    projectName,
    dateReview,
    image,
    score,
  } = props;

  const [isBrowser, setIsBrowser] = useState(false);
  const [coordinateOne, setCoordinateOne] = useState("");
  const [coordinateTwo, setCoordinateTwo] = useState("");
  const [coordinateThree, setCoordinateThree] = useState("");
  const [coordinateFour, setCoordinateFour] = useState("");

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e?: any) => {
    e.preventDefault();
    onClose();
  };

  const addAndCreate = () => {
    console.log("Trigger of the external adapter");
    definedCoordinates();
    onClose();
  };

  const createProject = () => {
    console.log('Trigger of the external adapter for a new project');
    onClose();
  }

  const tallyUpPolygon = () => {
    console.log("trigger bacalhau");
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledCloseOverlay onClick={handleCloseClick} />
      <StyledModal>
        <StyledModalHeader>
          <Image onClick={handleCloseClick} src={arrow} alt="close modal" />
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        {newProject ? (
          <StyledModalBody>
            <Input
              label="Coordinate 1"
              value={coordinateOne}
              onChange={setCoordinateOne}
            />
            <Input
              label="Coordinate 2"
              value={coordinateTwo}
              onChange={setCoordinateTwo}
            />
            <Input
              label="Coordinate 3"
              value={coordinateThree}
              onChange={setCoordinateThree}
            />
            <Input
              label="Coordinate 4"
              value={coordinateFour}
              onChange={setCoordinateFour}
            />
            <br />
            <StyledButton disabled={false} handler={createProject} text="Create project" />
          </StyledModalBody>
        ) : hasCoordinates && !newProject ? (
          <StyledModalNoCoordinatesBody>
            <StyledModalTitle>{projectName}</StyledModalTitle>
            <StyledProjectImage
              src={image || defaultImage}
              alt="project image"
            />
            <StyledButton disabled={false} handler={tallyUpPolygon} text="Tally up!" />
            <span>{dateReview}</span>
            <strong>Green Score: {score}</strong>
          </StyledModalNoCoordinatesBody>
        ) : (
          <StyledModalBody>
            <Input
              label="Coordinate 1"
              value={coordinateOne}
              onChange={setCoordinateOne}
            />
            <Input
              label="Coordinate 2"
              value={coordinateTwo}
              onChange={setCoordinateTwo}
            />
            <Input
              label="Coordinate 3"
              value={coordinateThree}
              onChange={setCoordinateThree}
            />
            <Input
              label="Coordinate 4"
              value={coordinateFour}
              onChange={setCoordinateFour}
            />
            <br />
            <StyledButton disabled={false} handler={addAndCreate} text="Add and create" />
          </StyledModalBody>
        )}
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  const foundElement = document.getElementById("modal-root");

  return isBrowser && foundElement
    ? ReactDOM.createPortal(modalContent, foundElement)
    : null;
};

const StyledProjectImage = styled(Image)`
  max-width: 300px;
  height: auto;
  margin: 20px auto;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
  transform: scale(0.3);
`;

const StyledCloseOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

const StyledModalTitle = styled.h2`
  font-size: 16px;
  width: 150px;
  margin: auto auto 20px;
  text-align: center;
`;

const StyledModalBody = styled.div`
  padding-top: 10px;
  text-align: center;
`;

const StyledModalNoCoordinatesBody = styled(StyledModalBody)`
  display: flex;
  flex-direction: column;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 25px;
  margin: 20px;

  img {
    cursor: pointer;
    transform: scale(0.9);
  }
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
  z-index: 100;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
