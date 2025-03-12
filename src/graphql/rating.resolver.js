import Rating from '../models/rating.model.js';
import User from '../models/user.model.js';
import Restaurant from '../models/restaurant.model.js';
import Location from '../models/location.model.js';

export const resolvers = {
  Query: {
    getRatingsByRestaurant: async (_, { restaurantId }) => {
      return Rating.find({ restaurant: restaurantId })
        .populate({
          path: 'user',
          select: 'name email'
        })
        .populate({
          path: 'restaurant',
          populate: {
            path: 'location',
            model: 'Location'
          }
        });
    },

    getRating: async (_, { id }) => {
      const rating = await Rating.findById(id)
        .populate('user restaurant');
      
      if (!rating) throw new Error('Rating not found');
      return rating;
    }
  },

  Mutation: {
    rateRestaurant: async (_, { input }, context) => {
      const newRating = await Rating.create({
        ...input,
        user: context.user.id
      });

      const restaurant = await Restaurant.findById(input.restaurantId);
      const ratings = await Rating.find({ restaurant: input.restaurantId });
      restaurant.averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      await restaurant.save();

      return newRating.populate([
        { path: 'user', select: 'name email' },
        { 
          path: 'restaurant',
          populate: {
            path: 'location',
            model: 'Location'
          }
        }
      ]);
    },
  },

  Rating: {
    user: (rating) => User.findById(rating.user),
    restaurant: (rating) => Restaurant.findById(rating.restaurant)
  }
};