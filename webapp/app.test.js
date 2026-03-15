const request = require('supertest');
const express = require('express');

// Mock the pg module
jest.mock('pg', () => {
  return {
    Pool: jest.fn(() => ({
      query: jest.fn()
    }))
  };
});

const app = require('./app');

describe('GET /', () => {
  it('should respond with 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});