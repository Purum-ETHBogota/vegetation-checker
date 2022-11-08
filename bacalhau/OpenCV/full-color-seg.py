import cv2
import numpy as np

import matplotlib.pyplot as plt
from matplotlib import colors

from mpl_toolkits.mplot3d import Axes3D  
from matplotlib.colors import hsv_to_rgb

# Let's look at our aerial image

aerial = cv2.imread("../testPhotos/dron2.jpg")

# OpenCV by default opens images in BGR color space
# So we have to convert it to RGB

aerial = cv2.cvtColor(aerial, cv2.COLOR_BGR2RGB)

plt.imshow(aerial)
plt.show()

#Pixel color in the 3D graph
pixel_colors = aerial.reshape((np.shape(aerial)[0] * np.shape(aerial)[1], 3))
norm = colors.Normalize(vmin=-1.0, vmax=1.0)
norm.autoscale(pixel_colors)
pixel_colors = norm(pixel_colors).tolist()

#Plot in HSV
hsv_aerial = cv2.cvtColor(aerial, cv2.COLOR_RGB2HSV)
h, s, v = cv2.split(hsv_aerial)

fig = plt.figure()
axis = fig.add_subplot(1, 1, 1, projection="3d")

axis.scatter(
    h.flatten(), s.flatten(), v.flatten(), facecolors=pixel_colors, marker="."
)
axis.set_xlabel("Hue")
axis.set_ylabel("Saturation")
axis.set_zlabel("Value")
plt.show()


light_green = (50, 50, 50)
dark_green = (120, 255, 255)

# Normalise to 0 - 1 range for viewing

lg_square = np.full((10, 10, 3), light_green, dtype=np.uint8) / 255.0
dg_square = np.full((10, 10, 3), dark_green, dtype=np.uint8) / 255.0

plt.subplot(1, 2, 1)
plt.imshow(hsv_to_rgb(dg_square))
plt.subplot(1, 2, 2)
plt.imshow(hsv_to_rgb(lg_square))
plt.show()

# Segment aerial using inRange() function

mask = cv2.inRange(hsv_aerial, light_green, dark_green)

# Bitwise-AND mask and original image

result = cv2.bitwise_and(aerial, aerial, mask=mask)

# Convert back to RGB in order to plot using `matplotlib.pyplot`

plt.subplot(1, 2, 1)
plt.imshow(mask, cmap="gray")
plt.subplot(1, 2, 2)
plt.imshow(result)
plt.show()

#Calculate a score based on how much "green" is in the image

greenPixels = np.count_nonzero(mask == 255)
noGreenPixels = np.count_nonzero(mask == 0)

print('green pixels:', greenPixels)
print('not green pixels:', noGreenPixels)
 
# height, width, number of channels in image
height = aerial.shape[0]
width = aerial.shape[1]

print('Image Height       : ',height)
print('Image Width        : ',width)

score = round((greenPixels*10/(height*width)),1)
print('Green score is:', score)

#Save the result image:
cv2.imwrite('result.jpg',result)
print('Saving the result image as result.jpg')

#Save the green score in a file
f = open("score.txt", "w")
f.write(str(score))
f.close()
