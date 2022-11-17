import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import Card from "../components/Card";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const APIURL = "https://api.thegraph.com/subgraphs/name/toucanprotocol/matic";

const toucanQuery = `
  query($offset: Int) {
    projects(first: 9 skip: $offset) {
      id
      method
      emissionType
      category
      region
      standard
      methodology
      storageMethod
      projectId
      vintages {
        id
        name
        totalVintageQuantity
        additionalCertification
        tco2Token {
          symbol
          address
          score
          name
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default function Home() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNewProject = () => {
    console.log("holi");
  };

  useEffect(() => {
    client
      .query({
        query: gql(toucanQuery),
        variables: {
          offset,
        },
      })
      .then((res) => {
        const manageData: any = [...data, ...res.data.projects];
        setData(manageData);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const handleMore = () => {
    setOffset(offset + 9);
    setLoading(true);
  };

  return (
    <>
      <Header />
      <WrapperNewProject>
        <Button text="Create new Project" handler={handleNewProject} />
      </WrapperNewProject>
      <WrapperCards>
        {data &&
          data.map(
            (project: {
              id: number;
              method: string;
              emissionType: string;
              category: string;
              region: string;
              standard: string;
              methodology: string;
              storageMethod: string;
              projectId: string;
              vintages: [
                {
                  id: number;
                  name: string;
                  totalVintageQuantity: number;
                  additionalCertification: string;
                  tco2Token: {
                    symbol: string;
                    address: string;
                    score: number;
                    name: string;
                  };
                }
              ];
            }) => {
              console.log("project is ", project);
              return (
                <Card
                  key={project.id}
                  name={project.projectId}
                  description={
                    project.vintages.length > 0
                      ? project.vintages[0].tco2Token.name
                      : "No description available"
                  }
                  credits={`${
                    project.vintages.length > 0
                      ? project.vintages[0].totalVintageQuantity
                      : "No"
                  } credits available`}
                  verifier={project.standard}
                  country={project.region || "Worldwide"}
                  rating={project.methodology}
                  purpose="Agriculture Forestry and Other Land Use"
                  year={
                    project.vintages.length > 0
                      ? project.vintages[0].name
                      : "No year available"
                  }
                />
              );
            }
          )}
      </WrapperCards>
      {loading ? <Spinner /> : <LoadMore onClick={handleMore}>+</LoadMore>}
      <FooterMessage>
        Project created for the Chainlink Hackathon by team Purum
      </FooterMessage>
    </>
  );
}

const rotate = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadMore = styled.button`
  display: flex;
  font-size: 45px;
  font-weight: 400;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 1000px;
  border: none;
  background: #fff;
  box-shadow: 10px 10px 25px -10px rgba(0, 0, 0, 0.25);
  margin: 20px auto;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  margin: 20px;
  height: 80px;
  margin-left: 50vw;
  transform: translateX(-50%);

  :after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #7e7e7e;
    border-color: #7e7e7e transparent #7e7e7e transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;

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
