TODO:
    - swagger 
    - .env checker
    - health endpoint
    - logger
    - pagination


  - refatorar em outro projeto o graphql


    // ex of graphql req
query {
  getRatingsByRestaurant(restaurantId: "67cc70e5758e78b39ae18cf8") {
    rating
    comment
  }
}