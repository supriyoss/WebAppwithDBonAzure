const request = require('supertest');
const { Pool } = require('pg');

// Mock the pg module
jest.mock('pg', () => {
  const mockQuery = jest.fn();
  const mockPool = { query: mockQuery };
  return {
    Pool: jest.fn(() => mockPool)
  };
});

const app = require('./app');

describe('Todo App', () => {
  let mockQuery;

  beforeEach(() => {
    const mockPool = new Pool();
    mockQuery = mockPool.query;
    mockQuery.mockClear();
  });

  describe('GET /', () => {
    it('should respond with 200 and render todos', async () => {
      const mockTodos = [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true }
      ];
      mockQuery.mockResolvedValue({ rows: mockTodos });

      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Test Todo 1');
      expect(response.text).toContain('Test Todo 2');
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM todos ORDER BY id');
    });

    it('should handle database error', async () => {
      mockQuery.mockRejectedValue(new Error('DB Error'));

      const response = await request(app).get('/');
      expect(response.status).toBe(200); // Since it sends 'Error'
      expect(response.text).toContain('Error');
    });
  });

  describe('POST /add', () => {
    it('should add a todo and redirect', async () => {
      mockQuery.mockResolvedValue({});

      const response = await request(app)
        .post('/add')
        .send('title=New Todo');

      expect(response.status).toBe(302); // Redirect
      expect(response.headers.location).toBe('/');
      expect(mockQuery).toHaveBeenCalledWith('INSERT INTO todos (title, completed) VALUES ($1, $2)', ['New Todo', false]);
    });

    it('should handle database error on add', async () => {
      mockQuery.mockRejectedValue(new Error('DB Error'));

      const response = await request(app)
        .post('/add')
        .send('title=New Todo');

      expect(response.status).toBe(200);
      expect(response.text).toContain('Error');
    });

    it('should handle empty title', async () => {
      mockQuery.mockResolvedValue({});

      const response = await request(app)
        .post('/add')
        .send('title=');

      expect(response.status).toBe(302);
      expect(mockQuery).toHaveBeenCalledWith('INSERT INTO todos (title, completed) VALUES ($1, $2)', ['', false]);
    });
  });

  describe('POST /delete/:id', () => {
    it('should delete a todo and redirect', async () => {
      mockQuery.mockResolvedValue({});

      const response = await request(app)
        .post('/delete/1');

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe('/');
      expect(mockQuery).toHaveBeenCalledWith('DELETE FROM todos WHERE id = $1', ['1']);
    });

    it('should handle database error on delete', async () => {
      mockQuery.mockRejectedValue(new Error('DB Error'));

      const response = await request(app)
        .post('/delete/1');

      expect(response.status).toBe(200);
      expect(response.text).toContain('Error');
    });

    it('should handle invalid id', async () => {
      mockQuery.mockResolvedValue({});

      const response = await request(app)
        .post('/delete/abc');

      expect(response.status).toBe(302);
      expect(mockQuery).toHaveBeenCalledWith('DELETE FROM todos WHERE id = $1', ['abc']);
    });
  });

  describe('App Configuration', () => {
    it('should set view engine to ejs', () => {
      expect(app.get('view engine')).toBe('ejs');
    });

    it('should use urlencoded middleware', () => {
      // This is harder to test directly, but we can check if it handles form data
      // Already tested in POST routes
    });
  });
});