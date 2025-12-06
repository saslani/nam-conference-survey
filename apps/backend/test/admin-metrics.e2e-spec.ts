import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { Status } from '@prisma/client';

describe('Admin Metrics (e2e)', () => {
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

  describe('GET /api/admin/metrics', () => {
    it('should return zero counts for empty database', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/metrics')
        .expect(200);

      expect(response.body).toEqual({
        completed: 0,
        inProgress: 0,
      });
    });

    it('should return correct counts with only completed responses', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create 3 completed responses
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
            q3CoworkingEffectiveness: '4',
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/metrics')
        .expect(200);

      expect(response.body).toEqual({
        completed: 3,
        inProgress: 0,
      });
    });

    it('should return correct counts with only in-progress responses', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create 2 draft responses
      await prisma.surveyResponse.createMany({
        data: [
          {
            userId: user.id,
            status: Status.DRAFT,
            q1OverallRating: 5,
          },
          {
            userId: user.id,
            status: Status.DRAFT,
            q2ReturnIntent: 4,
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/metrics')
        .expect(200);

      expect(response.body).toEqual({
        completed: 0,
        inProgress: 2,
      });
    });

    it('should return correct counts with mix of both statuses', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create mix of responses
      await prisma.surveyResponse.createMany({
        data: [
          { userId: user.id, status: Status.SUBMITTED, q1OverallRating: 5 },
          { userId: user.id, status: Status.SUBMITTED, q2ReturnIntent: 4 },
          {
            userId: user.id,
            status: Status.DRAFT,
            q3CoworkingEffectiveness: '4',
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/metrics')
        .expect(200);

      expect(response.body).toEqual({
        completed: 2,
        inProgress: 1,
      });
    });

    it('should return correct structure with many responses', async () => {
      // Create test user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        },
      });

      // Create 47 submitted and 3 draft responses
      const submittedData = Array.from({ length: 47 }, () => ({
        userId: user.id,
        status: Status.SUBMITTED,
        q1OverallRating: 5,
      }));

      const draftData = Array.from({ length: 3 }, () => ({
        userId: user.id,
        status: Status.DRAFT,
        q1OverallRating: 3,
      }));

      await prisma.surveyResponse.createMany({
        data: [...submittedData, ...draftData],
      });

      const response = await request(app.getHttpServer())
        .get('/admin/metrics')
        .expect(200);

      expect(response.body).toEqual({
        completed: 47,
        inProgress: 3,
      });
    });

    it('should have correct Content-Type header', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/metrics')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('completed');
      expect(response.body).toHaveProperty('inProgress');
    });
  });
});
