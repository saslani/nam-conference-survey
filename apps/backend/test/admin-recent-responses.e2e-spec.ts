import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { Status } from '@prisma/client';

describe('Admin Recent Responses (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean up database before each test using DELETE to avoid deadlocks with concurrent test runs
    await prisma.surveyResponse.deleteMany({});
    await prisma.user.deleteMany({});
  });

  describe('GET /api/admin/recent-responses', () => {
    it('should return empty array for empty database', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body).toEqual({
        responses: [],
      });
    });

    it('should return correct structure with data', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create 2 submitted responses
      await prisma.surveyResponse.createMany({
        data: [
          {
            userId: user.id,
            status: Status.SUBMITTED,
            q1OverallRating: 5,
          },
          {
            userId: user.id,
            status: Status.SUBMITTED,
            q2ReturnIntent: 4,
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body).toHaveProperty('responses');
      expect(Array.isArray(response.body.responses)).toBe(true);
      expect(response.body.responses).toHaveLength(2);
      expect(response.body.responses[0]).toHaveProperty('id');
      expect(response.body.responses[0]).toHaveProperty('submittedAt');
      expect(typeof response.body.responses[0].id).toBe('string');
      expect(typeof response.body.responses[0].submittedAt).toBe('string');
    });

    it('should return fewer than 5 responses when database has fewer than 5', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create 3 submitted responses
      await prisma.surveyResponse.createMany({
        data: [
          {
            userId: user.id,
            status: Status.SUBMITTED,
            q1OverallRating: 5,
          },
          {
            userId: user.id,
            status: Status.SUBMITTED,
            q2ReturnIntent: 4,
          },
          {
            userId: user.id,
            status: Status.SUBMITTED,
            q3CoworkingEffectiveness: '3',
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body.responses).toHaveLength(3);
    });

    it('should return exactly 5 responses when database has exactly 5', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create 5 submitted responses
      await prisma.surveyResponse.createMany({
        data: Array.from({ length: 5 }, () => ({
          userId: user.id,
          status: Status.SUBMITTED,
          q1OverallRating: 5,
        })),
      });

      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body.responses).toHaveLength(5);
    });

    it('should return only 5 most recent responses when database has more than 5', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create 10 submitted responses
      await prisma.surveyResponse.createMany({
        data: Array.from({ length: 10 }, () => ({
          userId: user.id,
          status: Status.SUBMITTED,
          q1OverallRating: 5,
        })),
      });

      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body.responses).toHaveLength(5);
    });

    it('should only return SUBMITTED responses, not DRAFT', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create mix of SUBMITTED and DRAFT responses
      await prisma.surveyResponse.createMany({
        data: [
          {
            userId: user.id,
            status: Status.SUBMITTED,
            q1OverallRating: 5,
          },
          {
            userId: user.id,
            status: Status.SUBMITTED,
            q2ReturnIntent: 4,
          },
          {
            userId: user.id,
            status: Status.DRAFT,
            q3CoworkingEffectiveness: '3',
          },
          {
            userId: user.id,
            status: Status.DRAFT,
            q5ConnectionDepth: 2,
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body.responses).toHaveLength(2);
    });

    it('should return responses ordered by newest first', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create responses with slight time gaps to ensure different createdAt timestamps
      const response1 = await prisma.surveyResponse.create({
        data: {
          userId: user.id,
          status: Status.SUBMITTED,
          q1OverallRating: 1,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      const response2 = await prisma.surveyResponse.create({
        data: {
          userId: user.id,
          status: Status.SUBMITTED,
          q1OverallRating: 2,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      const response3 = await prisma.surveyResponse.create({
        data: {
          userId: user.id,
          status: Status.SUBMITTED,
          q1OverallRating: 3,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body.responses).toHaveLength(3);
      // Most recent should be first
      expect(response.body.responses[0].id).toBe(response3.id);
      expect(response.body.responses[1].id).toBe(response2.id);
      expect(response.body.responses[2].id).toBe(response1.id);
    });

    it('should have correct Content-Type header', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('responses');
    });

    it('should return timestamps in ISO 8601 format', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create a submitted response
      await prisma.surveyResponse.create({
        data: {
          userId: user.id,
          status: Status.SUBMITTED,
          q1OverallRating: 5,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/admin/recent-responses')
        .expect(200);

      expect(response.body.responses).toHaveLength(1);
      const timestamp = response.body.responses[0].submittedAt;
      // ISO 8601 format validation
      expect(timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
      // Should be parseable as a valid date
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });
  });
});
