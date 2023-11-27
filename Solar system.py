import pygame
import math
pygame.init()

WIDTH, HEIGHT = 800, 800
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Planet Simulation")

WHITE = (255, 255, 255)
YELLOW = (255, 255, 0)
BLUE = (100, 149, 237)
RED = (188, 39, 50)
DARK_GREY = (80, 78, 81)

class Planet:
    AU = 149.6e6 * 1000
    G = 6.67408e-11
    SCALE = 150 / AU
    TIMESTEP = 24 * 3600

    def __init__(self, x, y, radius, color, mass):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.mass = 0

        self.orbit = []
        self.sun = False
        self.distance_to_sun = 0

        self.x_vel = 0
        self.y_vel = 0

    def draw(self, WIN):
        x = self.x * self.SCALE + WIDTH / 2
        y = self.y * self.SCALE + HEIGHT / 2
        pygame.draw.circle(WIN, self.color, (x, y), self.radius)

def main():
    run = True
    clock = pygame.time.Clock()

    sun = Planet(0, 0, 30, YELLOW, 1.989 * 10**30)
    sun.sun = True

    earth = Planet(-1 * Planet.AU, 0, 16, BLUE, 5.9742 * 10**24)

    mars = Planet(-1.524 * Planet.AU, 0, 12, RED, 6.39 * 10**23)

    mercury = Planet(0.387 * Planet.AU, 0, 8, DARK_GREY, 0.330 * 10**24)

    venus = Planet(0.723 * Planet.AU, 0, 14, WHITE, 4.8685 * 10**24)

    planets = [sun, earth, mars, mercury, venus]

    while run:
        clock.tick(60)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

        for planet in planets:
            planet.draw(WIN)

        pygame.display.update() 
    pygame.quit()

main()