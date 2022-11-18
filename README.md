  

[![hypertally.png](https://i.postimg.cc/BbhQf4Ks/hypertally.png)](https://postimg.cc/5QCMwcgk)

# hypertally - *Chainlink Fall Hackathon*


## Demo Link

Please see intructions to run the complete at the bottom of this document. 
https://vegetation-checker.vercel.app/
  

## Inspiration

**hypertally** was created inspired by [Pachama](https://pachama.com/). Pachama is a company that trains Machine Learning models to analyze satellite data and assess the quality of nature-based carbon credits. We set out to create a solution that enables on-chain validation, monitoring, data analysis, and computer vision analysis of geo-referenced carbon projects using Chainlink oracles, IPFT NFT Storage, and Bacalhau as the main technologies.

  

## Problem are solving

Estimating how much carbon is stored by nature-based carbon projects is expensive, time-consuming, and relies heavily on centralized certification standards and third-party validation entities. Additionally, due to the high costs and resources required, project validation happens on a per-project basis, and very few projects can assess the scale of their impact on a larger eco-region and how other externalities like weather, global economic trends, and commodity prices affect the future of carbon projects.

  

Carbon tokens on-chain are a great innovation. Along with other solutions like the carbon pools and the open registries, create a new exciting design space for financial products and applications that could bring more transparency, traceability, and adoption to Carbon Markets. However, Carbon tokens are derived from traditional Carbon Credit certification and validation processes, therefore subject to its challenges.

  

## What it does

**hypertally** lets any stakeholder in a nature-based carbon project report the ecological state of a geo-referenced site. **hypertally** harnesses Project Bacalhau to run computing analysis with satellite and sensor data, and estimate the ecological state and potential impact of forest projects. **hypertally** aims to help communities, individuals, and institutions fund, launch, and monitor high-quality forest projects. Additionally, **hypertally** supports CPI data streams with the goal of creating a platform that incentivizes scientists and researchers to run analyses to further the impact of carbon projects. With **hypertally**, centralized certification entities could reduce the cost of project validation. Project Developers could assess the impact of their project and estimate how much carbon their projects will capture. Investors could study the health of a project and make informed investment decisions. Researchers can have access to an incentivized environment that aggregates different data streams related to carbon projects so they can add value to communities and project developers in need of deeper analysis and insights. Finally, Local stakeholders could participate in a network of land stewards supporting the monitoring of the ecological state of nearby projects.

  

## How we build it

**hypertally** lets users create dynamic geo-referenced NFTs that represent nature-based carbon projects using coordinates. The NFT contract calls a Satellite Data API using a Chainlink oracle to get an image of the site that gets stored in the NFTs metadata in IPFS NFT Storage.

**hypertally** then, lets anyone participate as a project advocate by reporting the ecological state of a site. **hypertally** does this by using an external adapter, a Data Provider Smart Contract on Chainlink, and the Chainlink network to let advocates submit data from Satellite Data APIs, CPI data, and other types of sensor data(LiDAR, Lab Tests, photos, etc). Data inputs are stored in the metadata of the NFT as well.

  

Additionally, **hypertally** enables users to take the information from the NFT metadata to run data analysis and computer vision analysis using OpenCV in a Bacalhau instance, returning and updating the ecological state of the forest project.

  

## What we learned

  

Building **hypertally** was a lot of fun. However, there are a few things we learned that we would like to change or improve in upcoming versions:

  

- We didn't prioritize the User Experience of this idea. In a future project, we would like to explore how individuals can submit geo-reference data from phones as well as how this tool can be used for Satellite Data providers as a revenue stream. We even finished the project dreaming about how to incentivize drone owners to report data.

- We wrote a smart contract for an optimistic oracle using UMA hoping to explore affordable and accurate data inputs. However, we deprioritized it in favor of having a working prototype in the time we had. We think this could be a great direction to explore in upcoming iterations.

- We were unable to try more interesting computer vision models with OpenCV due to the lack of time. However, we found several approaches to assessing the health of a forest project worth trying. In an upcoming iteration, we would like to explore the design of an open-source platform and incentives for researchers and scientists to support the creation of better computing models.

- In the future, we could harness Machine Learning to run even more interesting analyses using the data in **hypertally**. We look forward to learning how our solution would need to evolve to allow for that.

- We wanted to bring real carbon tokens from Toucan Protocol into the project. We believe a tool like **hypertally** can enrich the data of these tokens and augment their potential for impact and adoption.

  
  

## What's next for hypertally

We would love to design **hypertally** as a protocol. We are eager to explore how incentives, governance, and staking models can leverage the solution we prototyped to create a network of nature-based project advocates. There's lots of work to do and we are happy we got this far without any idea.

  

## Technologies we are using

 - We use the ERC721 standard for our geo-referenced NFTs, deployed in the Polygon Mumbai test net
 - We connect Toucan Protocol and bring their CO2 tokens, which are then mirrored in our platform with a geo-referenced NFT to enrich their data with coordinates, satellite imaging, and computing capabilities
 -  We deployed the Chainlink contract Operator.sol to run our own oracle
 - We created our own external adapter and deployed it on Google Cloud to call an off-chain Satellite Data API (Agromonitoring). We, then use IPFS NFT Storage to store a history of images associated to a geo-referenced NFT and making them available for anyone to run computing jobs
 - We created our own Chainlink node and deployed it on Google Cloud Services, available at [http://34.172.176.49/](http://34.172.176.49/)
 - Finally, we use Project Bacalhau to run Visual Computing jobs leveraring OpenCV

  

