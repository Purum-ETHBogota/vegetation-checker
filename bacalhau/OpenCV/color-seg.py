import cv2
import numpy as np

aerial = cv2.imread("../testPhotos/sat2.jpg")

aerial = cv2.cvtColor(aerial, cv2.COLOR_BGR2RGB)

#Select the range of colors in HSV
light_green = (50, 50, 50)
dark_green = (120, 255, 255)

# Segment aerial using inRange() function
hsv_aerial = cv2.cvtColor(aerial, cv2.COLOR_RGB2HSV)
mask = cv2.inRange(hsv_aerial, light_green, dark_green)

# Bitwise-AND mask and original image
result = cv2.bitwise_and(aerial, aerial, mask=mask)

#Calculate a score based on how much "green" is in the image
greenPixels = np.count_nonzero(mask == 255)

# height and width in image
height = aerial.shape[0]
width = aerial.shape[1]

score = round((greenPixels*10/(height*width)),1)
print('Green score is:', score)

#Save the result image:
cv2.imwrite('result.jpg',result)
print('Saving the result image as result.jpg')

#Save the green score in a file
f = open("score.txt", "w")
f.write(str(score))
f.close()