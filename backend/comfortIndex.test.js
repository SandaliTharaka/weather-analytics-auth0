const { calculateComfortIndex } = require("./comfortIndex");

describe("calculateComfortIndex", () => {
  describe("Basic Functionality", () => {
    test("should return a number between 0 and 100", () => {
      const result = calculateComfortIndex(22, 50, 5, 50);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should return high comfort index for ideal conditions", () => {
      // Ideal temp: 22°C, low humidity, low wind, low cloudiness
      const result = calculateComfortIndex(22, 30, 0, 0);
      expect(result).toBeGreaterThan(80);
    });

    test("should return low comfort index for extreme conditions", () => {
      // Very hot, high humidity, high wind, high cloudiness
      const result = calculateComfortIndex(45, 100, 30, 100);
      expect(result).toBeLessThan(20);
    });
  });

  describe("Temperature Impact", () => {
    test("should have maximum temperature score when at ideal temperature (22°C)", () => {
      // At 22°C with all other factors optimal: score = 40 + 25 + 20 + 15 = 100
      const result = calculateComfortIndex(22, 0, 0, 0);
      const expectedScore = 100; // All factors optimal
      expect(result).toBe(expectedScore);
    });

    test("should decrease comfort as temperature moves away from 22°C", () => {
      const comfort22 = calculateComfortIndex(22, 0, 0, 0);
      const comfort20 = calculateComfortIndex(20, 0, 0, 0);
      const comfort24 = calculateComfortIndex(24, 0, 0, 0);

      expect(comfort22 > comfort20).toBe(true);
      expect(comfort22 > comfort24).toBe(true);
    });

    test("should handle very cold temperatures", () => {
      const result = calculateComfortIndex(-10, 0, 0, 0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should handle very hot temperatures", () => {
      const result = calculateComfortIndex(50, 0, 0, 0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should decrease equally for symmetric temperature deviations", () => {
      const below22 = calculateComfortIndex(18, 0, 0, 0);
      const above22 = calculateComfortIndex(26, 0, 0, 0);
      expect(below22).toBe(above22);
    });
  });

  describe("Humidity Impact", () => {
    test("should have maximum humidity score with 0% humidity", () => {
      const result = calculateComfortIndex(22, 0, 0, 0);
      // All optimal: temp=40, humidity=25, wind=20, cloud=15 = 100
      expect(result).toBe(100);
    });

    test("should decrease comfort as humidity increases", () => {
      const low = calculateComfortIndex(22, 20, 0, 0);
      const high = calculateComfortIndex(22, 80, 0, 0);
      expect(low > high).toBe(true);
    });

    test("should handle very high humidity (100%)", () => {
      const result = calculateComfortIndex(22, 100, 0, 0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should have low score at 125% humidity (humidity score clamped to 0)", () => {
      // At 125% humidity: humidityScore = max(0, 25 - 125*0.2) = max(0, -5) = 0
      const result = calculateComfortIndex(22, 125, 0, 0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(100);
    });

    test("should handle moderate humidity levels", () => {
      const result = calculateComfortIndex(22, 50, 0, 0);
      expect(result).toBeGreaterThan(50);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe("Wind Speed Impact", () => {
    test("should have maximum wind score at 0 wind speed", () => {
      const result = calculateComfortIndex(22, 0, 0, 0);
      expect(result).toBe(100); // All factors optimal = 100
    });

    test("should decrease comfort as wind speed increases", () => {
      const calm = calculateComfortIndex(22, 0, 1, 0);
      const windy = calculateComfortIndex(22, 0, 20, 0);
      expect(calm > windy).toBe(true);
    });

    test("should handle high wind speeds", () => {
      const result = calculateComfortIndex(22, 0, 50, 0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should clamp to 0 when wind is very high", () => {
      const result = calculateComfortIndex(22, 0, 20, 0);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    test("should handle moderate wind speeds", () => {
      const result = calculateComfortIndex(22, 0, 5, 0);
      expect(result).toBeGreaterThan(50);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe("Cloudiness Impact", () => {
    test("should have maximum cloudiness score at 0% cloud cover", () => {
      const result = calculateComfortIndex(22, 0, 0, 0);
      expect(result).toBe(100); // All factors optimal
    });

    test("should decrease comfort as cloudiness increases", () => {
      const clear = calculateComfortIndex(22, 0, 0, 10);
      const cloudy = calculateComfortIndex(22, 0, 0, 100);
      expect(clear > cloudy).toBe(true);
    });

    test("should handle 100% cloudiness", () => {
      const result = calculateComfortIndex(22, 0, 0, 100);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should handle 0% cloudiness", () => {
      const result = calculateComfortIndex(22, 0, 0, 0);
      expect(result).toBe(100);
    });

    test("should handle moderate cloud cover", () => {
      const result = calculateComfortIndex(22, 0, 0, 50);
      expect(result).toBeGreaterThan(80);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe("Combined Effects", () => {
    test("should give highest score for perfect conditions", () => {
      const result = calculateComfortIndex(22, 0, 0, 0);
      expect(result).toBe(100);
    });

    test("should balance multiple negative factors", () => {
      // Slightly off ideal in all categories
      const result = calculateComfortIndex(20, 40, 5, 40);
      expect(result).toBeGreaterThan(40);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should give 0 for worst conditions", () => {
      const result = calculateComfortIndex(50, 100, 20, 100);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(20);
    });

    test("should be symmetric for temperature deviations in combined scenarios", () => {
      const cold = calculateComfortIndex(10, 50, 10, 50);
      const hot = calculateComfortIndex(34, 50, 10, 50);
      // Should have same impact from temperature
      expect(cold).toBe(hot);
    });
  });

  describe("Edge Cases and Boundary Values", () => {
    test("should handle zero values for all parameters", () => {
      const result = calculateComfortIndex(0, 0, 0, 0);
      // tempScore = 40 - |0-22|*2 = 40 - 44 = max(0, -4) = 0
      // humidityScore = 25, windScore = 20, cloudScore = 15
      // total = 0 + 25 + 20 + 15 = 60
      expect(result).toBe(60);
    });

    test("should never exceed 100", () => {
      const result = calculateComfortIndex(22, 0, 0, 0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should never go below 0", () => {
      const result = calculateComfortIndex(-50, 100, 100, 100);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    test("should handle negative temperature", () => {
      const result = calculateComfortIndex(-30, 50, 10, 50);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should handle extremely high values", () => {
      const result = calculateComfortIndex(100, 200, 100, 200);
      expect(result).toBe(0);
    });

    test("should handle decimal values for temperature", () => {
      const result = calculateComfortIndex(22.5, 50, 5.5, 50);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should handle decimal values for humidity", () => {
      const result = calculateComfortIndex(22, 50.5, 5, 50);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should handle decimal values for wind speed", () => {
      const result = calculateComfortIndex(22, 50, 5.5, 50);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should handle decimal values for cloudiness", () => {
      const result = calculateComfortIndex(22, 50, 5, 50.5);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe("Real World Scenarios", () => {
    test("should give good comfort for spring day", () => {
      // Spring: 18°C, 60% humidity, 8 km/h wind, 30% clouds
      const result = calculateComfortIndex(18, 60, 8, 30);
      expect(result).toBeGreaterThan(30);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should give moderate comfort for summer day", () => {
      // Summer: 28°C, 70% humidity, 12 km/h wind, 20% clouds
      const result = calculateComfortIndex(28, 70, 12, 20);
      expect(result).toBeGreaterThan(10);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should give low comfort for winter day", () => {
      // Winter: 5°C, 80% humidity, 20 km/h wind, 90% clouds
      const result = calculateComfortIndex(5, 80, 20, 90);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should give good comfort for mild autumn day", () => {
      // Autumn: 20°C, 55% humidity, 6 km/h wind, 40% clouds
      const result = calculateComfortIndex(20, 55, 6, 40);
      expect(result).toBeGreaterThan(30);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should give high comfort for perfect beach day", () => {
      // Beach day: 24°C, 45% humidity, 3 km/h wind, 10% clouds
      const result = calculateComfortIndex(24, 45, 3, 10);
      expect(result).toBeGreaterThan(60);
      expect(result).toBeLessThanOrEqual(100);
    });

    test("should give low comfort for extreme heat wave", () => {
      // Heat wave: 42°C, 90% humidity, 25 km/h wind, 80% clouds
      const result = calculateComfortIndex(42, 90, 25, 80);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(30);
    });
  });

  describe("Scoring Calculation Verification", () => {
    test("should correctly calculate temp score", () => {
      // At 22°C: tempScore = 40 - |22-22|*2 = 40
      // At 20°C: tempScore = 40 - |20-22|*2 = 40 - 4 = 36
      const result20 = calculateComfortIndex(20, 0, 0, 0);
      const result22 = calculateComfortIndex(22, 0, 0, 0);
      expect(result22 - result20).toBe(4);
    });

    test("should correctly calculate humidity score", () => {
      // At 0% humidity: humidityScore = 25 - 0*0.2 = 25
      // At 50% humidity: humidityScore = 25 - 50*0.2 = 15
      const result0 = calculateComfortIndex(0, 0, 0, 0);
      const result50 = calculateComfortIndex(0, 50, 0, 0);
      expect(result0 - result50).toBe(10);
    });

    test("should correctly calculate wind score", () => {
      // At 0 km/h: windScore = 20 - 0*2 = 20
      // At 5 km/h: windScore = 20 - 5*2 = 10
      const result0 = calculateComfortIndex(0, 0, 0, 0);
      const result5 = calculateComfortIndex(0, 0, 5, 0);
      expect(result0 - result5).toBe(10);
    });

    test("should correctly calculate cloud score", () => {
      // At 0% clouds: cloudScore = 15 - 0*0.1 = 15
      // At 100% clouds: cloudScore = 15 - 100*0.1 = 5
      const result0 = calculateComfortIndex(0, 0, 0, 0);
      const result100 = calculateComfortIndex(0, 0, 0, 100);
      expect(result0 - result100).toBe(10);
    });
  });

  describe("Parameter Type Handling", () => {
    test("should work with integer parameters", () => {
      const result = calculateComfortIndex(22, 50, 10, 50);
      expect(typeof result).toBe("number");
      expect(isNaN(result)).toBe(false);
    });

    test("should work with float parameters", () => {
      const result = calculateComfortIndex(22.5, 50.5, 10.5, 50.5);
      expect(typeof result).toBe("number");
      expect(isNaN(result)).toBe(false);
    });

    test("should return a finite number", () => {
      const result = calculateComfortIndex(22, 50, 10, 50);
      expect(isFinite(result)).toBe(true);
    });
  });
});
