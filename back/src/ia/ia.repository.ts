import { BadRequestException, Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });
import { CohereClientV2 } from 'cohere-ai';
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

@Injectable()
export class IaRepository {
  async completion() {
    try {
      const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful json creator. Create a json array of hotels.',
          },
          { role: 'user', content: 'can you create a json array of hotels?' },
        ],
        responseFormat: {
          type: 'json_object',
          jsonSchema: {
            type: 'object',
            required: [
              'id',
              'name',
              'details',
              'address',
              'availability',
              'rooms',
              'amenities',
            ],
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              details: {
                type: 'object',
                required: ['stars', 'rating', 'imgUrl', 'description'],
                properties: {
                  stars: { type: 'number' },
                  rating: { type: 'number' },
                  imgUrl: { type: 'string' },
                  description: { type: 'string' },
                },
              },
              address: {
                type: 'object',
                required: ['city', 'country', 'street'],
                properties: {
                  city: { type: 'string' },
                  country: { type: 'string' },
                  street: { type: 'string' },
                },
              },
              availability: {
                type: 'object',
                required: ['available', 'totalRoomsLeft'],
                properties: {
                  available: { type: 'boolean' },
                  totalRoomsLeft: { type: 'number' },
                },
              },
              rooms: {
                type: 'object',
                required: ['single', 'double', 'triple', 'suite'],
                properties: {
                  single: {
                    type: 'object',
                    required: ['available', 'roomsLeft', 'imgUrl', 'price'],
                    properties: {
                      available: { type: 'boolean' },
                      roomsLeft: { type: 'number' },
                      imgUrl: { type: 'string' },
                      price: {
                        type: 'object',
                        required: ['currency', 'value'],
                        properties: {
                          currency: { type: 'string' },
                          value: { type: 'number' },
                        },
                      },
                    },
                  },
                  double: {
                    type: 'object',
                    required: ['available', 'roomsLeft', 'imgUrl', 'price'],
                    properties: {
                      available: { type: 'boolean' },
                      roomsLeft: { type: 'number' },
                      imgUrl: { type: 'string' },
                      price: {
                        type: 'object',
                        required: ['currency', 'value'],
                        properties: {
                          currency: { type: 'string' },
                          value: { type: 'number' },
                        },
                      },
                    },
                  },
                  triple: {
                    type: 'object',
                    required: ['available', 'roomsLeft', 'imgUrl', 'price'],
                    properties: {
                      available: { type: 'boolean' },
                      roomsLeft: { type: 'number' },
                      imgUrl: { type: 'string' },
                      price: {
                        type: 'object',
                        required: ['currency', 'value'],
                        properties: {
                          currency: { type: 'string' },
                          value: { type: 'number' },
                        },
                      },
                    },
                  },
                  suite: {
                    type: 'object',
                    required: ['available', 'roomsLeft', 'imgUrl', 'price'],
                    properties: {
                      available: { type: 'boolean' },
                      roomsLeft: { type: 'number' },
                      imgUrl: { type: 'string' },
                      price: {
                        type: 'object',
                        required: ['currency', 'value'],
                        properties: {
                          currency: { type: 'string' },
                          value: { type: 'number' },
                        },
                      },
                    },
                  },
                },
              },
              amenities: {
                type: 'object',
                required: ['pool', 'spa', 'gym', 'restaurant', 'bar'],
                properties: {
                  pool: { type: 'boolean' },
                  spa: { type: 'boolean' },
                  gym: { type: 'boolean' },
                  restaurant: { type: 'boolean' },
                  bar: { type: 'boolean' },
                },
              },
            },
            stop_sequences: [],
            return_likelihoods: 'NONE',
          },
        },
      });
      console.log(response.message.content);
      return response.message.content;
    } catch (error) {
      throw new BadRequestException(
        'An error have occurred while creating hotels',
        error,
      );
    }
  }

  async text() {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        { role: 'system', content: 'You are a guy walking on the street' },
        {
          role: 'user',
          content: 'How would you greet the people?.',
        },
      ],
    });

    return response.message.content;
  }
}
