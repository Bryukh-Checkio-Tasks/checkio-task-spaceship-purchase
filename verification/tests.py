"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [150, 50, 1000, 100],
            "answer": 450
        },
        {
            "input": [150, 50, 900, 100],
            "answer": 400
        },
        {
            "input": [250, 50, 900, 100],
            "answer": 500
        },
        {
            "input": [100, 100, 300, 100],
            "answer": 200
        },
        {
            "input": [200, 100, 200, 100],
            "answer": 200
        },
        {
            "input": [500, 50, 1000, 50],
            "answer": 750
        },
        {
            "input": [500, 300, 700, 50],
            "answer": 700
        },
        {
            "input": [100, 50, 500, 400],
            "answer": 150
        },
        {
            "input": [100, 10, 200, 10],
            "answer": 150
        },
        {
            "input": [1000, 500, 2500, 500],
            "answer": 2000
        },
        {
            "input": [150, 50, 330, 100],
            "answer": 230
        },
        {
            "input": [200, 200, 500, 250],
            "answer": 400
        },
        {
            "input": [300, 50, 300, 50],
            "answer": 300
        }
    ],
    "Extra": [
        {
            "input": [100, 150, 500, 100],
            "answer": 400
        },
        {
            "input": [250, 50, 800, 100],
            "answer": 450
        },
        {
            "input": [300, 150, 450, 10],
            "answer": 450
        },
        {
            "input": [100, 30, 220, 10],
            "answer": 190
        },
        {
            "input": [500, 500, 3000, 1000],
            "answer": 1500
        },
        {
            "input": [210, 10, 210, 10],
            "answer": 210
        },
        {
            "input": [500, 10, 750, 200],
            "answer": 520
        }
    ]
}
