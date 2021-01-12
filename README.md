# ID_S10205535_ChristianAlexanderBB_Asg2_website

# Similar Artist Finder

This project aims to create a website where users can search for similar song artists to what was inputted in the search bar. For example, they can search for artists who create music similar to their favorite artists.

Along with the above feature, the website gives information about each similar artist, which gives the user some trivia.

The website also links to the new artists' Spotify accounts.
 
## Design Process

This website is designed for anybody who has an interest in musicians. It is designed to be simple to navigate and minimalistic for its aesthetics.

User Stories:
- As a person who listens to music, I want to search for a song artist similar to those that I like so that I can have more artists to listen to

- As a curious person, I want to learn more about different song artists to satisfy my curiosity and help me learn more

Adobe XD Links:
- Desktop Wireframe V1: https://xd.adobe.com/view/8496a08f-5478-4c3e-b127-c098ab12322b-d1c5/
- Mobile Wireframe V1: https://xd.adobe.com/view/fb2c9d65-4fba-4396-b5bd-fa56c94e9092-ae7f/
- Desktop Wireframe V2: https://xd.adobe.com/view/fa9d2be0-5e87-41e1-9f32-abe56eb6b83f-afce/
- Mobile Wireframe V2: https://xd.adobe.com/view/c807d5f3-6150-49d8-868c-453accd9f7c3-9d54/

## Features

- You can type in the search bar for the name of an artist, and up to 100 similar artists will appear below the search button
- You can click on the artist name and find the details of that artist. Clicking around the area or clicking on a new artist will collapse the information, making for a more aesthetic look

### Existing Features

- Feature 1 - allows users to achieve the goal of finding similar artists to what they searched for
- Feature 2 - allows users to get information about those artists and collapse the information once they are done reading
- Feature 3 - allows users to access the artist's Spotify account to see more of their music

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement

- Add the artist to followed artists on Spotify (Requires more thorough identification)

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Bootstrap](https://getbootstrap.com/)
    - The project uses **Bootstrap** to aid in CSS and HTML implementation.
- [Spotify_API](https://developer.spotify.com/documentation/web-api/)
    - The project uses the **Spotify API** to search for songs and find similar artists.
- [TheAudioDB_API](https://www.theaudiodb.com/api_guide.php)
    - The project uses **TheAudioDB API** to get artist info.


## Testing

1. Enter A Song Artist Form:
    1. Enter the song name as "hello"
    2. Click or tap "Get Similar Artists" 
    3. Scroll Down. Under Recommended Artists, there should be a sentence "No Similar Artists Found. Try Using A Different Artist"
    4. Try to submit a new form without any letters or numbers, only characters such as !, #, $
    5. Do Step 2
    6. You should not be able to scroll down, as the above characters are invalid. However, the sentence from step 3 may appear, which may or may not encourage the user to change their input

This project website is uniform across different browsers on either a desktop or a mobile device because normalize.css was used. The mobile version and desktop version function the same. However, the form fields in the mobile version is smaller than in the desktop.

An interesting problem is when you search for similar artists and scroll down, then click on one of the new artist's names, you will get the artist info but when you click on the name again, it will not collapse. However, clicking anywhere else allows you to collapse the information.

## Credits

- Ms Mei Hua Dai, my lecturer for ID, helped me understand the concepts involved in the project
- Mr Mika Lam Wang Hon, my friend, helped encourage me to do the project
- Mr Beak Wei Xiang, my friend and schoolmate, helped me with technical issues

### Content
Null

### Media
Null

### Acknowledgements

- I received inspiration for this project from a website called Spotalike, which helps you search for a similar song. I used it to search for songs similar to those I liked. However, I could not find a website that searched for a similar artist with artist details, so I decided to make Spotalike, but for artists instead of songs.

## Website
https://christian-alexander-bb.github.io/ID_S10205535_ChristianAlexanderBB_Asg2_website/