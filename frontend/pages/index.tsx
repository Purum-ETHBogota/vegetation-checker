import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import Card from "../components/Card";
import { sampleProject } from "./api/sample";

export default function Home() {
  const handleNewProject = () => {
    console.log("holi");
  };

  return (
    <>
      <Header />
      <WrapperNewProject>
        <Button
          text="Create new Project"
          handler={handleNewProject}
        />
      </WrapperNewProject>
      <WrapperCards>
        {sampleProject.map(
          (project: {
            name: string;
            description: string;
            credits: string;
            id: number;
            verifier: string;
            country: string;
            rating: string;
            purpose: string;
            year: number;
            image?: string;
          }) => (
            <Card
              key={project.id}
              name={project.name}
              description={project.description}
              credits={project.credits}
              verifier={project.verifier}
              country={project.country}
              rating={project.rating}
              purpose={project.purpose}
              year={project.year}
              image={project.image}
            />
          )
        )}
      </WrapperCards>
      <FooterMessage>Project created for the Chainlink Hackathon by team Purum</FooterMessage>
    </>
  );
}

const WrapperNewProject = styled.div`
  height: 300px;
  display: flex;
  width: 100%;
  text-align: center;
`;

const WrapperCards = styled.div`
  margin: 0 200px 100px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex-wrap: wrap;
`;

const FooterMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 10px;
  color: black;
  opacity: 0.4;
  margin: auto;
`;