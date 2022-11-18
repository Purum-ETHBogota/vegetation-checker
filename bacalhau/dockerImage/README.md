`color-seg.py` and `Dockerfile` are the files that are used to create a docker image and push it to docker hub. The image is public in docker hub as wildanvin/color-seg-chainlik-fall-22.

To create and debug the image I followed the following steps:

1. In the terminal:
   ```
   export IMAGE=wildanvin/color-seg-chainlik-fall-22
   sudo docker build -t ${IMAGE} .
   sudo docker image push ${IMAGE}
   ```
2. I tested the image locally with this docker command:
   ```
   sudo docker run -d \
    -v /path/to/local/input/folder:/inputs \
    -v /path/to/local/output/folder:/outputs \
    --name c0-test0 \
    wildanvin/color-seg-chainlik-fall-22 \
    sh -c 'python3 color-seg.py ./inputs/\*'
   ```
3. Also I used this command to log into the container and debug the image:

   ```
   sudo docker run -it \
   -v /path/to/local/input/folder:/inputs \
   -v /path/to/local/output/folder:/outputs \
   wildanvin/color-seg-chainlik-fall-22 \
   sh
   ```

4. Finally, with this command we can use bacalhau with the docker image to compute over data (pictures) on IPFS. I uploaded some pictures at this CID: Qmbjc3dqLoJ7FgF5RHqUxQEmHujqvmURbprXnfjiEwxeAV. One really IMPORTANT detail to mention is that the CID that you need to pass to bacalhau has to be a folder with the data! not a picture!... YOu can try this command in your terminal if you have installed bacalhau:
   ```
   bacalhau docker run \
   -v Qmbjc3dqLoJ7FgF5RHqUxQEmHujqvmURbprXnfjiEwxeAV:/inputs \
   wildanvin/color-seg-chainlik-fall-22 \
   -- sh -c 'python3 color-seg.py ./inputs/dron2.jpg'
   ```
