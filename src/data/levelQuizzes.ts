export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface LevelQuiz {
  courseId: string;
  levelNumber: number;
  levelTitle: string;
  passScorePercent: number;
  questions: QuizQuestion[];
}

export const LEVEL_QUIZZES: Record<string, Record<number, QuizQuestion[]>> = {
  // 1. APPLIED ROBOTICS & EMBEDDED IOT
  'robotics-makers-01': {
    1: [
      {
        id: 'rm-1-1',
        question: 'According to Ohm’s Law (V = I * R), if you increase resistance while voltage remains constant, what happens to the electric current?',
        options: ['Current increases', 'Current decreases', 'Current stays exactly the same', 'Voltage immediately drops to zero'],
        correctAnswer: 1,
        explanation: 'Ohm’s law states that current is inversely proportional to resistance. Increasing resistance reduces the rate of electron flow.',
      },
      {
        id: 'rm-1-2',
        question: 'Why must a resistor be connected in series with a Light Emitting Diode (LED)?',
        options: ['To change the color of the light', 'To limit current and prevent the LED from burning out', 'To increase battery lifespan tenfold', 'To invert the AC frequency to DC'],
        correctAnswer: 1,
        explanation: 'LEDs have very little internal resistance once forward bias is reached. A current-limiting resistor protects it from thermal runaway.',
      },
      {
        id: 'rm-1-3',
        question: 'Which pin on an ESP32 or Arduino microcontroller allows reading an analog voltage between 0V and 3.3V/5V?',
        options: ['GND pin', 'ADC (Analog-to-Digital Converter) pin', 'RESET pin', 'VCC rail'],
        correctAnswer: 1,
        explanation: 'ADC pins convert continuous analog voltages into digital numeric values (such as 0–1023 or 0–4095).',
      },
    ],
    2: [
      {
        id: 'rm-2-1',
        question: 'How does Pulse Width Modulation (PWM) control the speed of a DC motor?',
        options: ['By changing the motor shaft diameter', 'By rapidly switching power ON and OFF at varying duty cycles', 'By altering the magnetic flux of the stator', 'By reversing battery terminals 1000 times a second'],
        correctAnswer: 1,
        explanation: 'PWM rapidly modulates the average delivered electrical power by adjusting the duty cycle percentage.',
      },
      {
        id: 'rm-2-2',
        question: 'Why can you NOT power a high-torque DC motor directly from a microcontroller GPIO pin?',
        options: ['Microcontrollers only support wireless motors', 'GPIO pins cannot supply sufficient current and could destroy the chip', 'Microcontrollers only output negative current', 'Motors require pure sine-wave AC voltage'],
        correctAnswer: 1,
        explanation: 'Microcontroller pins typically supply under 20-40mA, whereas motors require several hundred milliamperes to amperes; an H-bridge motor driver is mandatory.',
      },
      {
        id: 'rm-2-3',
        question: 'What is the purpose of an ultrasonic HC-SR04 distance sensor?',
        options: ['Measuring room ambient air pressure', 'Measuring distance by calculating sound wave time-of-flight', 'Detecting radio waves in the 2.4GHz band', 'Calibrating motor shaft encoder RPM'],
        correctAnswer: 1,
        explanation: 'The HC-SR04 emits an ultrasonic burst and calculates distance based on the speed of sound and round-trip echo time.',
      },
    ],
    3: [
      {
        id: 'rm-3-1',
        question: 'What communication protocol uses SDA (Serial Data) and SCL (Serial Clock) wires?',
        options: ['SPI', 'I2C (Inter-Integrated Circuit)', 'UART', 'Bluetooth Low Energy'],
        correctAnswer: 1,
        explanation: 'I2C requires only two lines: SDA for bidirectional data and SCL for clock synchronization with bus addresses.',
      },
      {
        id: 'rm-3-2',
        question: 'What does a closed-loop PID controller calculate to keep a robot tracking a line?',
        options: ['Random motor steps', 'Proportional, Integral, and Derivative error corrections', 'Battery charging cycles', 'Mechanical gear wear ratios'],
        correctAnswer: 1,
        explanation: 'PID controller applies correction based on present error (P), accumulated past error (I), and future rate of error change (D).',
      },
      {
        id: 'rm-3-3',
        question: 'In embedded C++, what is an Interrupt Service Routine (ISR)?',
        options: ['A function that halts the program permanently', 'A lightweight function executed immediately when a hardware pin changes state', 'A graphics library for TFT screens', 'A sleep timer to preserve battery'],
        correctAnswer: 1,
        explanation: 'An ISR runs asynchronously in response to hardware triggers (like an encoder tick or stop button) without waiting for loop() polling.',
      },
    ],
    4: [
      {
        id: 'rm-4-1',
        question: 'Which lightweight publish/subscribe protocol is standard for IoT telemetry over WiFi?',
        options: ['HTTP POST only', 'MQTT (Message Queuing Telemetry Transport)', 'FTP', 'Telnet'],
        correctAnswer: 1,
        explanation: 'MQTT is designed for resource-constrained embedded devices with low bandwidth and minimal overhead.',
      },
      {
        id: 'rm-4-2',
        question: 'What is the function of an RTOS (Real-Time Operating System) on a dual-core microcontroller like ESP32?',
        options: ['Browsing the web', 'Deterministic task scheduling and multitasking threads', 'Formatting SD cards', 'Rendering 3D video'],
        correctAnswer: 1,
        explanation: 'FreeRTOS provides priority-based pre-emptive task scheduling so critical control loops execute without jitter.',
      },
      {
        id: 'rm-4-3',
        question: 'What does an IMU (Inertial Measurement Unit) sensor combine to estimate robot orientation?',
        options: ['GPS and barometer', 'Accelerometer and Gyroscope', 'Microphone and light sensor', 'Thermal camera and buzzer'],
        correctAnswer: 1,
        explanation: 'An 6-DOF IMU combines 3-axis accelerometer (gravity/linear motion) and 3-axis gyroscope (angular velocity).',
      },
    ],
    5: [
      {
        id: 'rm-5-1',
        question: 'In robotics, what is the purpose of Inverse Kinematics (IK)?',
        options: ['Calculating battery drain', 'Computing joint angles needed to position an end-effector at target (X, Y, Z) coordinates', 'Smoothing motor PWM frequencies', 'Measuring gear friction in oil'],
        correctAnswer: 1,
        explanation: 'Inverse Kinematics calculates the exact servo angles required to place a robotic claw or tip at a designated 3D coordinate.',
      },
      {
        id: 'rm-5-2',
        question: 'What open-source framework is standard for enterprise robotics communication, nodes, and SLAM?',
        options: ['ROS 2 (Robot Operating System 2)', 'Wordpress', 'jQuery', 'TensorBoard only'],
        correctAnswer: 0,
        explanation: 'ROS 2 is the global standard middleware for robot nodes, publisher-subscriber communication, and autonomous navigation.',
      },
      {
        id: 'rm-5-3',
        question: 'What does SLAM stand for in autonomous mobile robotics?',
        options: ['Synchronous Low Altitude Monitoring', 'Simultaneous Localization and Mapping', 'Simple Logic And Mechanics', 'System Level Access Module'],
        correctAnswer: 1,
        explanation: 'SLAM enables an autonomous robot to build a map of an unknown environment while tracking its own position within that map.',
      },
    ],
  },

  // 2. PYTHON GAME DEV & AI
  'python-game-ai': {
    1: [
      {
        id: 'py-1-1',
        question: 'Which Python data type represents an ordered, mutable sequence of items?',
        options: ['Tuple', 'List', 'Integer', 'String'],
        correctAnswer: 1,
        explanation: 'Lists (defined with square brackets [ ]) are ordered and mutable, allowing elements to be appended or changed.',
      },
      {
        id: 'py-1-2',
        question: 'What does the main loop in a 2D game engine (like Pygame) do every frame?',
        options: ['Compile Python to C++', 'Handle events, update positions, and render graphics', 'Reinstall third-party libraries', 'Save the game to cloud servers'],
        correctAnswer: 1,
        explanation: 'The game loop handles input events, updates state physics, and draws the updated frame onto the display buffer.',
      },
      {
        id: 'py-1-3',
        question: 'What is the boolean outcome of: `x = 10; y = 20; not (x > y or y == 20)`?',
        options: ['True', 'False', 'None', 'SyntaxError'],
        correctAnswer: 1,
        explanation: '`y == 20` is True, making the `or` expression True. The `not` operator inverts True to False.',
      },
    ],
    2: [
      {
        id: 'py-2-1',
        question: 'In Object-Oriented Programming (OOP), what is the purpose of the `__init__` method in Python?',
        options: ['To destroy an object when memory is full', 'To initialize attributes when a new instance of a class is created', 'To convert classes into lists', 'To import standard libraries'],
        correctAnswer: 1,
        explanation: '`__init__` is the constructor method in Python executed when an instance is instantiated.',
      },
      {
        id: 'py-2-2',
        question: 'In 2D game collision detection, what does AABB stand for?',
        options: ['All-Axis Binary Bounce', 'Axis-Aligned Bounding Box', 'Advanced Audio Base Band', 'Asynchronous Action Buffer'],
        correctAnswer: 1,
        explanation: 'Axis-Aligned Bounding Box is the standard rectangular hit-test algorithm with non-rotated edges.',
      },
      {
        id: 'py-2-3',
        question: 'What is "delta time" (dt) and why is it used in game physics calculations?',
        options: ['To speed up loading screens', 'To ensure game physics and movement speed remain uniform regardless of frame rate', 'To count player score multipliers', 'To compress sprite textures'],
        correctAnswer: 1,
        explanation: 'Multiplying speeds by delta time decouples motion from frame rate so games run identically on 30Hz and 144Hz monitors.',
      },
    ],
    3: [
      {
        id: 'py-3-1',
        question: 'Which algorithm is widely used in grid-based games to find the shortest obstacle-free path for AI agents?',
        options: ['Bubble Sort', 'A* (A-Star) Pathfinding', 'Binary Search', 'QuickSort'],
        correctAnswer: 1,
        explanation: 'A* uses heuristics combined with path cost to efficiently find the optimal route around barriers.',
      },
      {
        id: 'py-3-2',
        question: 'What is a Finite State Machine (FSM) in game AI?',
        options: ['A cloud server cluster', 'A behavioral model where an NPC transitions between distinct states like Patrol, Chase, and Attack', 'A screen resolution switcher', 'A graphics particle system'],
        correctAnswer: 1,
        explanation: 'FSM models NPC behaviors by defining clear states and rules for transitioning between them.',
      },
      {
        id: 'py-3-3',
        question: 'What is the Minimax algorithm used for in two-player board games like Tic-Tac-Toe or Chess?',
        options: ['Screen rendering', 'Finding the optimal move by minimizing the maximum possible loss', 'Sound volume compression', 'Downloading high scores'],
        correctAnswer: 1,
        explanation: 'Minimax recursively explores possible moves assuming both players play optimally.',
      },
    ],
    4: [
      {
        id: 'py-4-1',
        question: 'What library is the foundation for fast numerical array computations and matrix operations in Python?',
        options: ['NumPy', 'Flask', 'BeautifulSoup', 'Tkinter'],
        correctAnswer: 0,
        explanation: 'NumPy provides high-performance multidimensional arrays and vector operations written in C.',
      },
      {
        id: 'py-4-2',
        question: 'In Machine Learning, what is the role of the loss function during model training?',
        options: ['To delete invalid images', 'To measure the error between predicted outputs and actual targets', 'To format terminal logs', 'To regulate GPU fan speed'],
        correctAnswer: 1,
        explanation: 'The loss function quantifies model error; optimization algorithms adjust weights to minimize this error.',
      },
      {
        id: 'py-4-3',
        question: 'What computer vision library is used to capture webcam frames, detect faces, and track contours in real time?',
        options: ['OpenCV (cv2)', 'SQLite', 'Pandas', 'Jupyter'],
        correctAnswer: 0,
        explanation: 'OpenCV is the open-source computer vision library optimized for image processing and live video feeds.',
      },
    ],
    5: [
      {
        id: 'py-5-1',
        question: 'In Reinforcement Learning, what three core components define the agent’s interaction loop?',
        options: ['Input, Output, Battery', 'State, Action, and Reward', 'CPU, RAM, and Disk', 'HTML, CSS, and JS'],
        correctAnswer: 1,
        explanation: 'An RL agent observes the current State, takes an Action, and receives a numerical Reward to reinforce good policies.',
      },
      {
        id: 'py-5-2',
        question: 'What technique prevents an AI neural network from overfitting to training data?',
        options: ['Dropout and regularization', 'Increasing epochs indefinitely', 'Removing test datasets', 'Writing code without comments'],
        correctAnswer: 0,
        explanation: 'Dropout randomly deactivates neurons during training, forcing redundant representations that generalize well.',
      },
      {
        id: 'py-5-3',
        question: 'How are modern Python game builds packaged into standalone executable (.exe / binary) files?',
        options: ['PyInstaller or PyOxidizer', 'Exporting to PDF', 'Printing paper copies', 'Saving as .txt file'],
        correctAnswer: 0,
        explanation: 'PyInstaller bundles the Python runtime, scripts, and compiled C-extensions into a single standalone executable.',
      },
    ],
  },

  // 3. TEAM GRACE WEB & AI STUDIO
  'team-grace-web-studio': {
    1: [
      {
        id: 'tg-1-1',
        question: 'In semantic HTML5, which tag is best suited for independent, syndicatable content like a blog post or student article?',
        options: ['<div>', '<article>', '<span>', '<b>'],
        correctAnswer: 1,
        explanation: 'The <article> element represents a self-contained composition in a document intended to be independently reusable.',
      },
      {
        id: 'tg-1-2',
        question: 'In modern CSS, what layout model is designed for 1-dimensional row or column alignment?',
        options: ['CSS Grid', 'Flexbox', 'Floats', 'HTML Tables'],
        correctAnswer: 1,
        explanation: 'Flexbox is ideal for 1D distributions along a main axis, while Grid specializes in 2D grid matrix layouts.',
      },
      {
        id: 'tg-1-3',
        question: 'What does CSS specificity determine when multiple rules target the same DOM element?',
        options: ['How fast the browser loads', 'Which style declaration takes precedence and gets applied', 'The download size of images', 'The language of text'],
        correctAnswer: 1,
        explanation: 'Specificity calculates cascade weight (inline styles > ID selectors > class/attribute selectors > element tags).',
      },
    ],
    2: [
      {
        id: 'tg-2-1',
        question: 'Which JavaScript method is used to attach an event listener without overwriting existing handlers?',
        options: ['element.addEventListener()', 'element.onclick = function()', 'element.listen()', 'element.trigger()'],
        correctAnswer: 0,
        explanation: '`addEventListener` allows multiple handlers to safely listen for the same event type on an element.',
      },
      {
        id: 'tg-2-2',
        question: 'What does `localStorage.getItem("key")` return if the key does not exist in the browser storage?',
        options: ['undefined', 'null', '0', 'Empty string ""'],
        correctAnswer: 1,
        explanation: 'The web Storage API specification returns `null` when an item key does not exist in localStorage.',
      },
      {
        id: 'tg-2-3',
        question: 'What is the purpose of asynchronous `async/await` syntax in JavaScript?',
        options: ['To pause the computer clock', 'To write asynchronous Promise-based code in a clean, readable synchronous style', 'To speed up CSS animations', 'To prevent users from opening devtools'],
        correctAnswer: 1,
        explanation: '`async/await` provides syntactic sugar over Promises, making network requests and async sequences easier to read and error-handle.',
      },
    ],
    3: [
      {
        id: 'tg-3-1',
        question: 'In React, what hook is used to retain state data between component re-renders?',
        options: ['useEffect', 'useState', 'useRef', 'useCallback'],
        correctAnswer: 1,
        explanation: '`useState` provides a state variable and setter function that triggers a re-render when state changes.',
      },
      {
        id: 'tg-3-2',
        question: 'Why should list items in React always have a unique `key` prop?',
        options: ['To style them with CSS', 'To help React identify which items have changed, been added, or removed during virtual DOM diffing', 'To assign keyboard shortcuts', 'To count total items'],
        correctAnswer: 1,
        explanation: 'Keys give elements a stable identity across renders, preventing costly re-creations and state bugs.',
      },
      {
        id: 'tg-3-3',
        question: 'What does the dependency array `[]` in `useEffect(() => { ... }, [])` mean?',
        options: ['Run the effect on every mouse move', 'Run the effect only once when the component mounts', 'Never run the effect', 'Run the effect every millisecond'],
        correctAnswer: 1,
        explanation: 'An empty dependency array indicates the effect depends on no variables, so it executes once on initial mount.',
      },
    ],
    4: [
      {
        id: 'tg-4-1',
        question: 'What does TypeScript add on top of standard JavaScript?',
        options: ['Static type checking, interfaces, and compile-time error detection', 'Faster internet speeds', 'Built-in database engines', 'Automatic 3D rendering'],
        correctAnswer: 0,
        explanation: 'TypeScript adds compile-time static types, generics, and strict contracts that catch bugs before code runs in production.',
      },
      {
        id: 'tg-4-2',
        question: 'In a client-server architecture, what HTTP response status code signifies a successful request?',
        options: ['200 OK', '404 Not Found', '500 Internal Server Error', '301 Moved Permanently'],
        correctAnswer: 0,
        explanation: 'Status codes in the 200–299 range indicate that the client’s request was successfully received, understood, and accepted.',
      },
      {
        id: 'tg-4-3',
        question: 'What is a JSON Web Token (JWT) typically used for in web applications?',
        options: ['Image compression', 'Stateless user authentication and authorized API session verification', 'Translating languages', 'Caching font files'],
        correctAnswer: 1,
        explanation: 'A JWT is a digitally signed compact token used to securely transmit claims and authenticate user identities across requests.',
      },
    ],
    5: [
      {
        id: 'tg-5-1',
        question: 'What enables a Progressive Web App (PWA) to function offline and load cached assets instantly?',
        options: ['Browser cookies', 'A Service Worker intercepting network fetch requests', 'High-speed 5G', 'Webcam permissions'],
        correctAnswer: 1,
        explanation: 'Service Workers act as client-side network proxies capable of serving cached assets from CacheStorage even without internet.',
      },
      {
        id: 'tg-5-2',
        question: 'What makes an application accessible according to WCAG AA guidelines?',
        options: ['Sufficient color contrast, keyboard navigability, ARIA labels, and semantic markup', 'Only using dark mode', 'Hiding all text in images', 'Removing all links'],
        correctAnswer: 0,
        explanation: 'Accessibility ensures digital products can be used comfortably by everyone, including people using screen readers and keyboards.',
      },
      {
        id: 'tg-5-3',
        question: 'What is CI/CD in modern software development?',
        options: ['Continuous Integration and Continuous Deployment/Delivery', 'Computer Interface & Computer Driver', 'Central Internet Code Directory', 'Client Interaction & Customer Design'],
        correctAnswer: 0,
        explanation: 'CI/CD automates testing, building, and deploying software updates whenever new code commits are pushed.',
      },
    ],
  },

  // 4. CODE RISE YOUTH CODERS
  'code-rise': {
    1: [
      {
        id: 'cr-1-1',
        question: 'What are the three core languages of modern front-end web development?',
        options: ['HTML, CSS, and JavaScript', 'Python, C++, and Assembly', 'SQL, PHP, and Bash', 'Excel, Word, and PowerPoint'],
        correctAnswer: 0,
        explanation: 'HTML structures content, CSS provides visual styling and responsiveness, and JavaScript powers interactive behavior.',
      },
      {
        id: 'cr-1-2',
        question: 'Which HTML element is used to insert a clickable link leading to another webpage?',
        options: ['<link>', '<a> with href attribute', '<button href>', '<url>'],
        correctAnswer: 1,
        explanation: 'The anchor tag `<a>` with the `href` attribute defines hyperlinks to external or internal destinations.',
      },
      {
        id: 'cr-1-3',
        question: 'In CSS, what property changes the space inside a button between the text and its border?',
        options: ['margin', 'padding', 'border-radius', 'font-size'],
        correctAnswer: 1,
        explanation: 'Padding controls inner space inside an element’s border; margin controls outer space outside the border.',
      },
    ],
    2: [
      {
        id: 'cr-2-1',
        question: 'Why is mobile-first design essential when building commercial websites for small businesses?',
        options: ['Desktop computers are obsolete', 'Over 70% of local customers browse and order products directly from smartphones', 'Mobile websites do not need images', 'Search engines ignore laptops'],
        correctAnswer: 1,
        explanation: 'Most consumer traffic comes from mobile devices, so designing for smartphones first maximizes sales conversions.',
      },
      {
        id: 'cr-2-2',
        question: 'How can a single-page restaurant menu allow customers to place orders without an expensive credit card processor?',
        options: ['Sending orders directly to a business WhatsApp number with items pre-filled', 'Printing a physical receipt', 'Asking customers to visit a bank in person', 'Using floppy disks'],
        correctAnswer: 0,
        explanation: 'Direct WhatsApp integration (`https://wa.me/...`) lets customers order instantly with zero transaction fees for small businesses.',
      },
      {
        id: 'cr-2-3',
        question: 'What is the most effective way for a beginner freelance coder to land their first paying client?',
        options: ['Sending generic mass emails', 'Pre-building a clean demo website for a local business and showing it to the owner', 'Waiting for clients to find their social media profile', 'Charging $5,000 for a first project'],
        correctAnswer: 1,
        explanation: 'Showing a live, working demo branded with the client’s name eliminates doubt and demonstrates immediate value.',
      },
    ],
    3: [
      {
        id: 'cr-3-1',
        question: 'Why do international remote businesses pay remote freelancers for Python automation scripts?',
        options: ['Python is required by law', 'Python automates repetitive tasks like data extraction, lead collection, and report generation in seconds', 'To replace all human employees', 'Python runs without electricity'],
        correctAnswer: 1,
        explanation: 'Automation scripts save businesses hundreds of hours of manual data entry and spreadsheet processing every month.',
      },
      {
        id: 'cr-3-2',
        question: 'What Python library is standard for reading, cleaning, and transforming tabular Excel and CSV files?',
        options: ['Pandas', 'Turtle', 'PyGame', 'Django'],
        correctAnswer: 0,
        explanation: 'Pandas is the leading data manipulation library, allowing fast filtering, deduplication, and aggregation.',
      },
      {
        id: 'cr-3-3',
        question: 'When quoting a freelance client, what practice protects you from working without getting paid?',
        options: ['Delivering all finished code before any payment', 'Requiring a 50% upfront deposit and clear written scope of work', 'Never discussing money until the project ends', 'Working for free exposure only'],
        correctAnswer: 1,
        explanation: 'A 50% deposit and defined scope establish mutual trust and protect your time from scope creep.',
      },
    ],
    4: [
      {
        id: 'cr-4-1',
        question: 'What is the difference between a client-side API call and server-side code?',
        options: ['Client-side runs in the user’s browser; server-side runs on remote infrastructure protecting secrets', 'They are completely identical', 'Client-side only works on iPhones', 'Server-side is only for CSS styling'],
        correctAnswer: 0,
        explanation: 'Server-side execution keeps private API keys and sensitive database credentials secure from browser inspection.',
      },
      {
        id: 'cr-4-2',
        question: 'Which platform allows hosting front-end web applications completely free with custom domains and SSL?',
        options: ['Vercel, Netlify, or GitHub Pages', 'Local floppy disk', 'Notepad', 'Microsoft Word'],
        correctAnswer: 0,
        explanation: 'Modern platforms like Vercel, Netlify, and GitHub Pages host static and serverless front-ends for free.',
      },
      {
        id: 'cr-4-3',
        question: 'What is Git used for in professional software engineering?',
        options: ['Sending emails', 'Distributed version control and tracking changes in source code', 'Editing video footage', 'Drawing 3D models'],
        correctAnswer: 1,
        explanation: 'Git tracks revisions, allows branch experimentation, and facilitates collaboration across teams.',
      },
    ],
    5: [
      {
        id: 'cr-5-1',
        question: 'What constitutes a professional developer portfolio website?',
        options: ['A single photo of yourself', 'Live links to real functioning web apps, clear problem statements, tech stack badges, and contact options', 'A list of your favorite video games', 'A blank page with your phone number'],
        correctAnswer: 1,
        explanation: 'Clients and employers evaluate portfolios based on demonstrable, live working projects and clear business value.',
      },
      {
        id: 'cr-5-2',
        question: 'What is "SEO" (Search Engine Optimization) and why do clients pay extra for it?',
        options: ['System Error Overwrite', 'Optimizing website code and structure so Google ranks the business higher in search results', 'Sound Effect Output', 'Simple Email Organization'],
        correctAnswer: 1,
        explanation: 'SEO brings organic customer traffic to websites, directly generating revenue for business owners.',
      },
      {
        id: 'cr-5-3',
        question: 'What is the mindset difference between an amateur hobbyist and a professional youth developer?',
        options: ['Professionals focus on solving real client problems, reliability, and clear communication', 'Hobbyists work faster than professionals', 'Professionals only write code in dark rooms', 'There is no difference'],
        correctAnswer: 0,
        explanation: 'Professional developers understand that technical mastery is a tool for delivering genuine value to people and businesses.',
      },
    ],
  },

  // 5. ADVERT CLINIC
  'advert-clinic': {
    1: [
      {
        id: 'ac-1-1',
        question: 'In direct response marketing, what does the AIDA copywriting formula stand for?',
        options: ['Action, Idea, Design, Art', 'Attention, Interest, Desire, Action', 'Always Increase Daily Ads', 'Audio, Image, Description, Audience'],
        correctAnswer: 1,
        explanation: 'AIDA guides the reader from initial hook (Attention), to curiosity (Interest), to wanting the solution (Desire), to buying (Action).',
      },
      {
        id: 'ac-1-2',
        question: 'Why is a specific number in an ad headline (e.g. "Save 35% on Braid Styles") more effective than a vague claim ("Big Discounts")?',
        options: ['Numbers trigger mathematical calculations', 'Specific numbers feel authentic, concrete, and increase viewer credibility and click-through rates', 'Social media algorithms only accept numbers', 'Numbers make the ad cheaper to run'],
        correctAnswer: 1,
        explanation: 'Specificity builds trust; vague claims are easily dismissed by skeptical consumers scrolling their feeds.',
      },
      {
        id: 'ac-1-3',
        question: 'What is the primary role of the first 3 seconds of a social video ad (the "Scroll Stopper Hook")?',
        options: ['Showing the company legal disclaimer', 'Preventing the viewer from swiping away and establishing immediate curiosity or problem relevance', 'Playing soft elevator music', 'Displaying employee credits'],
        correctAnswer: 1,
        explanation: 'If the hook does not capture interest in the first 3 seconds, viewers swipe away and never see your offer or call to action.',
      },
    ],
    2: [
      {
        id: 'ac-2-1',
        question: 'What is the difference between a "Feature" and a "Benefit" in advertising copy?',
        options: ['A feature is what a product has; a benefit is the positive emotional or practical outcome the customer experiences', 'They are identical marketing terms', 'Features are for women, benefits are for men', 'Features are only for software products'],
        correctAnswer: 0,
        explanation: 'Customers buy benefits (e.g., "Wake up with flawless skin in 10 minutes"), not just dry features (e.g., "Contains 5% salicylic acid").',
      },
      {
        id: 'ac-2-2',
        question: 'What is a "Call to Action" (CTA)?',
        options: ['A phone call to the CEO', 'A direct, unambiguous instruction telling the prospect exactly what step to take next (e.g. "Tap to Order on WhatsApp")', 'An alarm siren in an audio ad', 'A legal copyright notice'],
        correctAnswer: 1,
        explanation: 'A strong CTA removes confusion by telling the prospect precisely what action to take next.',
      },
      {
        id: 'ac-2-3',
        question: 'In visual ad design, what does high contrast between text and background achieve?',
        options: ['It makes files bigger', 'It ensures readability on small, low-brightness mobile screens in direct sunlight', 'It inverts color palettes randomly', 'It hides text from non-buyers'],
        correctAnswer: 1,
        explanation: 'Mobile users scroll in various lighting conditions; low contrast text causes instant drop-off.',
      },
    ],
    3: [
      {
        id: 'ac-3-1',
        question: 'What does "ROAS" stand for in paid ad campaigns?',
        options: ['Return On Ad Spend', 'Rate Of Audience Share', 'Reach Over Active Sellers', 'Revenue On Annual Sales'],
        correctAnswer: 0,
        explanation: 'ROAS measures gross revenue generated for every dollar invested in advertising ($400 revenue from $100 ad spend = 4.0x ROAS).',
      },
      {
        id: 'ac-3-2',
        question: 'If a small bakery spends $10/day on ads and gets 2 new cake orders per day worth $30 each, what is their daily gross profit margin before ingredients?',
        options: ['$10', '$60 revenue minus $10 ad spend = $50', '$100', '$0'],
        correctAnswer: 1,
        explanation: '2 orders x $30 = $60 revenue. Subtracting the $10 daily ad spend yields $50 gross return.',
      },
      {
        id: 'ac-3-3',
        question: 'What is A/B split testing in digital advertising?',
        options: ['Testing battery life', 'Running two ad variations with a single variable changed (like headline or creative) to see which converts higher', 'Translating ads into two languages', 'Deleting ads after two days'],
        correctAnswer: 1,
        explanation: 'A/B testing isolates individual variables so advertisers can make data-driven decisions on winning creative.',
      },
    ],
    4: [
      {
        id: 'ac-4-1',
        question: 'Why are customer reviews, before-and-after photos, and video testimonials called "Social Proof"?',
        options: ['They prove who owns social media accounts', 'They provide third-party validation that reduces buyer skepticism and risk', 'They reduce tax liability', 'They increase video resolution'],
        correctAnswer: 1,
        explanation: 'People look to the actions and experiences of peers to validate their own purchasing decisions.',
      },
      {
        id: 'ac-4-2',
        question: 'What is "Retargeting" in advertising?',
        options: ['Showing ads specifically to people who already visited your store, clicked your links, or engaged with your brand', 'Targeting people in other countries', 'Changing your brand logo every month', 'Firing your advertising manager'],
        correctAnswer: 0,
        explanation: 'Retargeting reaches warm prospects who showed interest, resulting in higher conversion rates at lower acquisition costs.',
      },
      {
        id: 'ac-4-3',
        question: 'What is a "Lead Magnet"?',
        options: ['A physical refrigerator magnet', 'A valuable free resource (discount code, styling guide, free sample) given in exchange for contact info', 'A broken advertisement', 'A negative customer review'],
        correctAnswer: 1,
        explanation: 'Lead magnets entice potential buyers to opt in, building a valuable subscriber and customer database.',
      },
    ],
    5: [
      {
        id: 'ac-5-1',
        question: 'What is Customer Lifetime Value (CLV or LTV)?',
        options: ['How long a customer stays alive', 'The total net profit a business expects to earn over the entire duration of its relationship with a customer', 'The price of an annual gym membership', 'The daily ad budget'],
        correctAnswer: 1,
        explanation: 'Knowing LTV allows businesses to invest confidently in customer acquisition knowing repeat purchases compound profits.',
      },
      {
        id: 'ac-5-2',
        question: 'Why should a young entrepreneur build an owned customer email/phone list instead of relying 100% on social media followers?',
        options: ['Email is faster than messaging apps', 'You own your contact list; social media algorithms can change or ban your account at any moment', 'Social media is shutting down worldwide', 'Contact lists require no internet'],
        correctAnswer: 1,
        explanation: 'Direct customer communication via email/SMS gives the business sovereign control independent of third-party platform algorithm whims.',
      },
      {
        id: 'ac-5-3',
        question: 'What is an "Irresistible Offer" in commercial business?',
        options: ['An offer that is free forever', 'A high-value proposition with strong risk reversal (guarantee), bonuses, and clear urgency that makes saying yes easy', 'An illegal discount scheme', 'A product with zero competition'],
        correctAnswer: 1,
        explanation: 'Combining high perceived value, clear bonuses, and money-back or satisfaction guarantees turns lukewarm prospects into buyers.',
      },
    ],
  },

  // 6. ROBO MECH (Tracks: beginners, intermediate, pro)
  'robo-mech': {
    1: [
      {
        id: 'rmech-1-1',
        question: 'What are the three core disciplines merged within Mechatronics engineering?',
        options: ['Mechanics, Electronics, and Computing/Software', 'Chemistry, Biology, and Geology', 'Aviation, Sailing, and Driving', 'Carpentry, Plumbing, and Masonry'],
        correctAnswer: 0,
        explanation: 'Mechatronics is the synergistic integration of mechanical systems, electronic hardware, and software control.',
      },
      {
        id: 'rmech-1-2',
        question: 'What is the purpose of a pull-up resistor on a digital input pin connected to a momentary push button?',
        options: ['To generate heat', 'To guarantee a stable HIGH logic level when the switch is open, preventing a "floating" pin', 'To step down 220V AC voltage', 'To make the button illuminate'],
        correctAnswer: 1,
        explanation: 'Floating pins pick up ambient electromagnetic noise and toggle erratically. Pull-up resistors lock the default state to HIGH.',
      },
      {
        id: 'rmech-1-3',
        question: 'What type of motor is best suited for precision angular positioning (e.g. 0 to 180 degrees) without continuous rotation?',
        options: ['Standard brushed DC motor', 'Servo motor', 'Induction AC motor', 'Gasoline combustion engine'],
        correctAnswer: 1,
        explanation: 'Hobby servos contain internal potentiometer feedback and control circuitry to hold commanded shaft angles precisely.',
      },
    ],
    2: [
      {
        id: 'rmech-2-1',
        question: 'Why is an H-Bridge circuit (such as the L298N) necessary for bidirectional DC motor control?',
        options: ['To change the color of the motor casing', 'To allow changing current polarity through the motor coils, reversing shaft direction', 'To increase WiFi signal range', 'To convert digital signals to audio'],
        correctAnswer: 1,
        explanation: 'An H-bridge uses 4 switching transistors to alternate the direction of current flow through the motor load.',
      },
      {
        id: 'rmech-2-2',
        question: 'What is "back-EMF" generated by an electric motor when it stops spinning?',
        options: ['A friendly signal to the microcontroller', 'A reverse voltage spike caused by collapsing magnetic fields that can damage electronics without flyback diodes', 'Free battery recharging electricity', 'Air cooling flow'],
        correctAnswer: 1,
        explanation: 'Inductive loads generate high reverse voltage transients when switched off; flyback diodes safely clamp these spikes.',
      },
      {
        id: 'rmech-2-3',
        question: 'What sensor measures angular velocity and tilt angles for balancing two-wheeled robots?',
        options: ['Barometer', '6-Axis MPU-6050 Accelerometer + Gyroscope', 'LDR photoresistor', 'Piezo buzzer'],
        correctAnswer: 1,
        explanation: 'The MPU-6050 combines a 3-axis accelerometer and 3-axis gyroscope with an internal Digital Motion Processor (DMP).',
      },
    ],
    3: [
      {
        id: 'rmech-3-1',
        question: 'In a mechanical gear train, what happens to torque when a small drive gear turns a gear with three times more teeth?',
        options: ['Torque decreases by 3x', 'Torque increases by 3x, while rotational speed decreases by 3x', 'Torque and speed both double', 'Torque becomes zero'],
        correctAnswer: 1,
        explanation: 'Gear ratios trade angular velocity for mechanical torque: a 3:1 reduction multiplies output torque by 3.',
      },
      {
        id: 'rmech-3-2',
        question: 'What is the role of an Optical Rotary Encoder on a motor shaft?',
        options: ['Projecting light onto the floor', 'Measuring exact wheel revolutions and speed through pulse counts for closed-loop odometry', 'Preventing dust buildup in gears', 'Measuring ambient room temperature'],
        correctAnswer: 1,
        explanation: 'Encoders produce pulses as slotted disks rotate, enabling microcontrollers to calculate exact distance traveled and velocity.',
      },
      {
        id: 'rmech-3-3',
        question: 'What is a Complementary Filter or Kalman Filter used for in robotics?',
        options: ['Filtering debris from motor oil', 'Fusing noisy accelerometer data with drifting gyroscope data for accurate angle estimation', 'Filtering network packets in routers', 'Enhancing microphone audio quality'],
        correctAnswer: 1,
        explanation: 'Sensor fusion algorithms blend the fast response of gyros with the long-term drift-free gravity reference of accelerometers.',
      },
    ],
    4: [
      {
        id: 'rmech-4-1',
        question: 'What is the fundamental difference between a Stepper Motor and a DC Motor with encoder?',
        options: ['Stepper motors move in discrete, repeatable angle increments (steps) without requiring feedback sensors', 'Stepper motors only run on solar power', 'DC motors cannot turn continuously', 'Stepper motors have no magnets'],
        correctAnswer: 0,
        explanation: 'Stepper motors have multiple toothed electromagnets arranged around a central rotor, stepping predictably with each pulse sequence.',
      },
      {
        id: 'rmech-4-2',
        question: 'In pneumatic and hydraulic mechatronic actuators, what medium transmits mechanical force?',
        options: ['Radio signals', 'Compressed air (pneumatics) or pressurized fluid/oil (hydraulics)', 'Pure electrical voltage', 'Magnetic sound waves'],
        correctAnswer: 1,
        explanation: 'Pneumatics uses compressed air for fast, clean actuation; hydraulics uses pressurized fluids for immense lifting force.',
      },
      {
        id: 'rmech-4-3',
        question: 'What is the function of a solenoid valve in an automated robotic fluid/air circuit?',
        options: ['Measuring air temperature', 'Electromechanically opening or closing fluid/air flow when an electrical current is applied', 'Generating electricity from wind', 'Filtering physical impurities'],
        correctAnswer: 1,
        explanation: 'A solenoid uses an electromagnetic coil to actuate a plunger that directs or stops pneumatic/hydraulic flow.',
      },
    ],
    5: [
      {
        id: 'rmech-5-1',
        question: 'What is an "End-Effector" on a robotic manipulator arm?',
        options: ['The battery at the base', 'The device or tool attached to the end of the robotic arm (gripper, suction cup, welder, or drill)', 'The emergency stop switch on the wall', 'The computer monitor displaying code'],
        correctAnswer: 1,
        explanation: 'The end-effector is the business end of the robot that physically interacts with parts and the work environment.',
      },
      {
        id: 'rmech-5-2',
        question: 'In industrial mechatronics, what does PLC stand for?',
        options: ['Programmable Logic Controller', 'Public Light Circuit', 'Power Level Converter', 'Parallel Line Cable'],
        correctAnswer: 0,
        explanation: 'PLCs are ruggedized digital industrial computers designed for reliable control of manufacturing processes in harsh environments.',
      },
      {
        id: 'rmech-5-3',
        question: 'What safety standard is paramount when designing collaborative robots (Cobots) that work alongside human operators?',
        options: ['Making robots move as fast as possible', 'Force and power limiting, collision detection, and tactile safety stops', 'Removing all emergency stop buttons', 'Operating without any software'],
        correctAnswer: 1,
        explanation: 'Cobots must feature certified force-sensing torque limits that immediately halt motion if contact with a human is detected.',
      },
    ],
  },
};

/**
 * Returns a 3-question mastery quiz for any course and level.
 * If specific handcrafted questions exist in the registry, returns them;
 * otherwise dynamically generates contextual questions based on the level.
 */
export function getLevelQuizQuestions(
  courseId: string,
  levelNumber: number,
  levelTitle: string,
  courseTitle: string
): QuizQuestion[] {
  if (LEVEL_QUIZZES[courseId] && LEVEL_QUIZZES[courseId][levelNumber]) {
    return LEVEL_QUIZZES[courseId][levelNumber];
  }

  // Generative fallback for other courses / levels
  return [
    {
      id: `${courseId}-l${levelNumber}-q1`,
      question: `In ${courseTitle} (${levelTitle}), what is the primary core objective of this curriculum tier?`,
      options: [
        `Mastering fundamental theory, laboratory safety, and foundational tooling`,
        `Skipping practical exercises to focus purely on high-level speculation`,
        `Memorizing dry definitions without testing physical or digital prototypes`,
        `Relying on pre-made answers without understanding underlying principles`,
      ],
      correctAnswer: 0,
      explanation: `Foundational mastery requires rigorous hands-on laboratory application, safety protocols, and direct tool engagement.`,
    },
    {
      id: `${courseId}-l${levelNumber}-q2`,
      question: `When executing the practical lab challenges in ${levelTitle}, what practice ensures robust, repeatable results?`,
      options: [
        `Ignoring systematic testing and guessing parameters randomly`,
        `Careful iterative testing, recording telemetry/metrics, and debugging step-by-step`,
        `Leaving work unverified until final evaluation day`,
        `Bypassing quality checks to finish ahead of schedule`,
      ],
      correctAnswer: 1,
      explanation: `Iterative engineering, telemetry recording, and methodical verification distinguish professional practitioners from novices.`,
    },
    {
      id: `${courseId}-l${levelNumber}-q3`,
      question: `How does mastering Level ${levelNumber} prepare you for real-world impact and future advanced innovation?`,
      options: [
        `It provides verified competencies, problem-solving confidence, and a verifiable academic credential`,
        `It only qualifies you to take multiple-choice quizzes`,
        `It limits your knowledge strictly to one textbook edition`,
        `It has no connection to modern industry workflows`,
      ],
      correctAnswer: 0,
      explanation: `Every completed level builds tangible portfolio assets, verified credentials, and real-world applied technical capability.`,
    },
  ];
}
