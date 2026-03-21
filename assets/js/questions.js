/* ============================================================
   PRACTICE QUESTIONS — Core Topics
   Mowden Hall CE Maths Revision
   4 questions per topic, typed numerical answers.
   Each question: { q, a, tolerance?, explanation?, hint? }
   ============================================================ */

window.PRACTICE_QUESTIONS = {

  'core/averages': [
    {
      q: 'Find the mean of: 4, 7, 3, 8, 3.',
      a: 5,
      explanation: 'Add all values (4+7+3+8+3 = 25) then divide by 5.'
    },
    {
      q: 'Find the median of: 2, 5, 1, 9, 4.',
      a: 4,
      explanation: 'Sort first: 1, 2, 4, 5, 9. The middle value is 4.'
    },
    {
      q: 'Find the range of: 12, 5, 19, 7, 3.',
      a: 16,
      explanation: 'Range = biggest \u2212 smallest = 19 \u2212 3 = 16.'
    },
    {
      q: 'What is the mode of: 3, 5, 3, 7, 5, 3?',
      a: 3,
      explanation: 'Mode is the most frequent value. 3 appears 3 times.'
    }
  ],

  'core/percentages': [
    {
      q: 'Find 35% of 200.',
      a: 70,
      explanation: '35% \u00d7 200 = 0.35 \u00d7 200 = 70.'
    },
    {
      q: 'A price of \u00a380 increases by 15%. What is the new price? (\u00a3)',
      a: 92,
      explanation: '80 \u00d7 1.15 = 92.'
    },
    {
      q: 'After a 20% discount a jacket costs \u00a348. What was the original price? (\u00a3)',
      a: 60,
      explanation: '\u00a348 = 80% of original. Original = 48 \u00f7 0.8 = 60.'
    },
    {
      q: 'Express 36 out of 48 as a percentage.',
      a: 75,
      explanation: '36 \u00f7 48 = 0.75 = 75%.'
    }
  ],

  'core/algebra-basics': [
    {
      q: 'Solve: 3x + 7 = 22. What is x?',
      a: 5,
      explanation: '3x = 15, so x = 5.'
    },
    {
      q: 'Solve: 5x \u2212 3 = 17. What is x?',
      a: 4,
      explanation: '5x = 20, so x = 4.'
    },
    {
      q: 'Solve: 2(x + 4) = 18. What is x?',
      a: 5,
      explanation: 'Expand: 2x + 8 = 18, so 2x = 10, x = 5.'
    },
    {
      q: 'Solve: x \u00f7 4 + 3 = 7. What is x?',
      a: 16,
      explanation: 'x \u00f7 4 = 4, so x = 16.'
    }
  ],

  'core/angles': [
    {
      q: 'A triangle has angles of 47\u00b0 and 65\u00b0. Find the third angle. (\u00b0)',
      a: 68,
      explanation: 'Angles in a triangle sum to 180\u00b0. 180 \u2212 47 \u2212 65 = 68.'
    },
    {
      q: 'What is the sum of interior angles of a pentagon? (\u00b0)',
      a: 540,
      explanation: '(n \u2212 2) \u00d7 180 = 3 \u00d7 180 = 540\u00b0.'
    },
    {
      q: 'Co-interior angles on parallel lines sum to 180\u00b0. One angle is 73\u00b0. Find the co-interior angle. (\u00b0)',
      a: 107,
      explanation: '180 \u2212 73 = 107\u00b0.'
    },
    {
      q: 'An isosceles triangle has a base angle of 52\u00b0. What is the apex angle? (\u00b0)',
      a: 76,
      explanation: 'Both base angles are 52\u00b0. Apex = 180 \u2212 52 \u2212 52 = 76.'
    }
  ],

  'core/coordinates-graphs': [
    {
      q: 'What is the x-coordinate of the midpoint of (2, 4) and (8, 10)?',
      a: 5,
      explanation: 'Midpoint x = (2 + 8) \u00f7 2 = 5.'
    },
    {
      q: 'What is the y-coordinate of the midpoint of (1, 3) and (5, 9)?',
      a: 6,
      explanation: 'Midpoint y = (3 + 9) \u00f7 2 = 6.'
    },
    {
      q: 'Using y = 2x + 3, what is y when x = 4?',
      a: 11,
      explanation: 'y = 2(4) + 3 = 8 + 3 = 11.'
    },
    {
      q: 'A line passes through (0, 5) and (2, 9). What is the gradient?',
      a: 2,
      explanation: 'Gradient = (9 \u2212 5) \u00f7 (2 \u2212 0) = 4 \u00f7 2 = 2.'
    }
  ],

  'core/powers-roots': [
    {
      q: 'What is 7\u00b2?',
      a: 49,
      explanation: '7 \u00d7 7 = 49.'
    },
    {
      q: 'What is the cube root of 27? (\u221b27)',
      a: 3,
      explanation: '3 \u00d7 3 \u00d7 3 = 27, so \u221b27 = 3.'
    },
    {
      q: 'What is \u221a144?',
      a: 12,
      explanation: '12 \u00d7 12 = 144.'
    },
    {
      q: 'What is 2\u2075?',
      a: 32,
      explanation: '2 \u00d7 2 \u00d7 2 \u00d7 2 \u00d7 2 = 32.'
    }
  ],

  'core/probability': [
    {
      q: 'A bag has 5 red and 15 blue balls. What percentage of the balls are red?',
      a: 25,
      explanation: '5 out of 20 = 5/20 = 25%.'
    },
    {
      q: 'A dice is rolled 60 times. How many times would you expect to get a 6?',
      a: 10,
      explanation: 'P(6) = 1/6. Expected = 60 \u00d7 1/6 = 10.'
    },
    {
      q: 'A fair coin is flipped 200 times. How many heads would you expect?',
      a: 100,
      explanation: 'P(heads) = 0.5. Expected = 200 \u00d7 0.5 = 100.'
    },
    {
      q: 'P(event) = 0.35. What is P(not the event) as a percentage?',
      a: 65,
      explanation: 'P(not event) = 1 \u2212 0.35 = 0.65 = 65%.'
    }
  ],

  'core/ratio': [
    {
      q: 'Share \u00a380 in the ratio 3:5. What is the larger share? (\u00a3)',
      a: 50,
      explanation: 'Total parts = 8. Each part = \u00a310. Larger share = 5 \u00d7 10 = \u00a350.'
    },
    {
      q: 'A recipe uses flour and sugar in ratio 4:1. You use 200 g flour. How much sugar? (g)',
      a: 50,
      explanation: '200 g flour = 4 parts, so 1 part = 50 g. Sugar = 50 g.'
    },
    {
      q: 'Two numbers are in ratio 3:7 and sum to 50. What is the larger number?',
      a: 35,
      explanation: 'Total parts = 10. Each part = 5. Larger = 7 \u00d7 5 = 35.'
    },
    {
      q: 'Simplify 24:36. What is the first number in the simplified ratio?',
      a: 2,
      explanation: 'HCF of 24 and 36 is 12. 24\u00f712 : 36\u00f712 = 2:3.'
    }
  ],

  'core/sequences-nth-term': [
    {
      q: 'The nth term of a sequence is 3n + 4. What is the 10th term?',
      a: 34,
      explanation: '3(10) + 4 = 30 + 4 = 34.'
    },
    {
      q: 'The nth term is 5n \u2212 2. What is the 6th term?',
      a: 28,
      explanation: '5(6) \u2212 2 = 30 \u2212 2 = 28.'
    },
    {
      q: 'The sequence is 3, 7, 11, 15, 19\u2026 What is the 20th term?',
      a: 79,
      explanation: 'nth term = 4n \u2212 1. 20th term = 4(20) \u2212 1 = 79.'
    },
    {
      q: 'A sequence starts at 6 and increases by 5 each time. What is the 8th term?',
      a: 41,
      explanation: '6 + (8\u22121) \u00d7 5 = 6 + 35 = 41.'
    }
  ],

  'core/shape': [
    {
      q: 'A rectangle has length 9 cm and width 4 cm. What is its area? (cm\u00b2)',
      a: 36,
      explanation: 'Area = length \u00d7 width = 9 \u00d7 4 = 36 cm\u00b2.'
    },
    {
      q: 'A triangle has base 8 cm and height 5 cm. What is its area? (cm\u00b2)',
      a: 20,
      explanation: 'Area = \u00bd \u00d7 base \u00d7 height = \u00bd \u00d7 8 \u00d7 5 = 20 cm\u00b2.'
    },
    {
      q: 'A trapezium has parallel sides 6 cm and 10 cm and height 4 cm. What is its area? (cm\u00b2)',
      a: 32,
      explanation: 'Area = \u00bd(a + b)h = \u00bd(6 + 10) \u00d7 4 = 32 cm\u00b2.'
    },
    {
      q: 'A circle has radius 7 cm. What is the area to the nearest whole number? (cm\u00b2)',
      a: 154,
      tolerance: 1,
      explanation: 'Area = \u03c0 \u00d7 r\u00b2 = \u03c0 \u00d7 49 \u2248 153.9 \u2248 154 cm\u00b2.'
    }
  ],

  'core/speed-distance-time': [
    {
      q: 'A car travels 240 km in 3 hours. What is its average speed? (km/h)',
      a: 80,
      explanation: 'Speed = Distance \u00f7 Time = 240 \u00f7 3 = 80 km/h.'
    },
    {
      q: 'A cyclist rides at 15 mph for 4 hours. How far do they travel? (miles)',
      a: 60,
      explanation: 'Distance = Speed \u00d7 Time = 15 \u00d7 4 = 60 miles.'
    },
    {
      q: 'A train travels 360 km at 90 km/h. How long does the journey take? (hours)',
      a: 4,
      explanation: 'Time = Distance \u00f7 Speed = 360 \u00f7 90 = 4 hours.'
    },
    {
      q: 'A runner covers 10 km at 8 km/h. How many minutes does this take?',
      a: 75,
      explanation: 'Time = 10 \u00f7 8 = 1.25 hours = 75 minutes.'
    }
  ],

  'core/straight-line-graphs': [
    {
      q: 'A line has equation y = 4x \u2212 3. What is the gradient?',
      a: 4,
      explanation: 'In y = mx + c, m is the gradient. Here m = 4.'
    },
    {
      q: 'A line has equation y = 2x + 7. What is the y-intercept?',
      a: 7,
      explanation: 'In y = mx + c, c is the y-intercept. Here c = 7.'
    },
    {
      q: 'A line passes through (0, \u22122) and (3, 4). What is the gradient?',
      a: 2,
      explanation: 'Gradient = (4 \u2212 (\u22122)) \u00f7 (3 \u2212 0) = 6 \u00f7 3 = 2.'
    },
    {
      q: 'The line y = mx + 5 passes through the point (2, 11). What is m?',
      a: 3,
      explanation: '11 = m(2) + 5. So 2m = 6, m = 3.'
    }
  ],

  'core/transformations': [
    {
      q: 'Point (3, 4) is reflected in the y-axis. What is the new x-coordinate?',
      a: -3,
      explanation: 'Reflection in y-axis: x \u2192 \u2212x. So x becomes \u22123.'
    },
    {
      q: 'Point (\u22122, 5) is translated by vector (4, \u22123). What is the new y-coordinate?',
      a: 2,
      explanation: 'New y = 5 + (\u22123) = 2.'
    },
    {
      q: 'A shape is enlarged by scale factor 3. A side of length 4 cm becomes what length? (cm)',
      a: 12,
      explanation: 'New length = 4 \u00d7 3 = 12 cm.'
    },
    {
      q: 'Point (6, 2) is rotated 90\u00b0 clockwise about the origin. What is the new x-coordinate?',
      a: 2,
      explanation: '90\u00b0 clockwise: (x, y) \u2192 (y, \u2212x). So (6, 2) \u2192 (2, \u22126). New x = 2.'
    }
  ],

  'core/volume-surface-area': [
    {
      q: 'A cuboid has dimensions 3 cm \u00d7 4 cm \u00d7 5 cm. What is its volume? (cm\u00b3)',
      a: 60,
      explanation: 'Volume = length \u00d7 width \u00d7 height = 3 \u00d7 4 \u00d7 5 = 60 cm\u00b3.'
    },
    {
      q: 'A cube has side length 4 cm. What is its surface area? (cm\u00b2)',
      a: 96,
      explanation: 'A cube has 6 faces. SA = 6 \u00d7 4\u00b2 = 6 \u00d7 16 = 96 cm\u00b2.'
    },
    {
      q: 'A triangular prism has a triangle area of 15 cm\u00b2 and a length of 8 cm. What is its volume? (cm\u00b3)',
      a: 120,
      explanation: 'Volume = cross-section \u00d7 length = 15 \u00d7 8 = 120 cm\u00b3.'
    },
    {
      q: 'A cylinder has radius 3 cm and height 10 cm. What is the volume to the nearest whole number? (cm\u00b3)',
      a: 283,
      tolerance: 1,
      explanation: 'Volume = \u03c0 \u00d7 r\u00b2 \u00d7 h = \u03c0 \u00d7 9 \u00d7 10 \u2248 282.7 \u2248 283 cm\u00b3.'
    }
  ],

  'core/charts-data': [
    {
      q: 'A frequency table shows: score 2 (freq 3), score 4 (freq 5), score 6 (freq 2). What is the mean score?',
      a: 3.8,
      tolerance: 0.05,
      explanation: 'Total = (2\u00d73)+(4\u00d75)+(6\u00d72) = 6+20+12 = 38. Frequency = 10. Mean = 38\u00f710 = 3.8.'
    },
    {
      q: 'From the same table (scores 2, 4, 6 with frequencies 3, 5, 2), what is the modal score?',
      a: 4,
      explanation: 'Mode = score with the highest frequency. Score 4 has frequency 5.'
    },
    {
      q: '10 students scored: 5, 7, 8, 4, 9, 6, 8, 7, 5, 7. What is the mode?',
      a: 7,
      explanation: '7 appears 3 times \u2014 more than any other score.'
    },
    {
      q: 'The 10 scores sorted in order are: 4, 5, 5, 6, 7, 7, 7, 8, 8, 9. What is the median?',
      a: 7,
      explanation: 'With 10 values, median = mean of 5th and 6th = (7+7)\u00f72 = 7.'
    }
  ]

};
