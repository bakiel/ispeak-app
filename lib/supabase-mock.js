// Mock data for development when Supabase connection fails
export const mockBlogData = {
  posts: [
    {
      id: '9f5f6a06-86ef-408c-8fbc-6e4a98054e3e',
      title: 'Why Cultural Context Matters in Language Learning',
      slug: 'cultural-context-language-learning',
      excerpt: 'Discover how understanding cultural nuances enhances language acquisition and creates deeper connections with heritage languages.',
      content: `
        <p>When learning a language, especially one connected to your heritage, understanding the cultural context is just as important as mastering grammar and vocabulary. At iSPEAK, we believe that language and culture are inseparable.</p>
        
        <h2>The Deep Connection</h2>
        <p>African languages carry within them centuries of wisdom, traditions, and ways of seeing the world. When a child learns Yoruba, they're not just learning words – they're connecting with a worldview that values community, respect for elders, and the interconnectedness of all things.</p>
        
        <h2>Beyond Words</h2>
        <p>Consider the Yoruba greeting system. It's not just about saying "hello" – it's about acknowledging the time of day, the person's age, their activities, and showing proper respect. This cultural richness is what makes language learning transformative.</p>
        
        <h2>Our Approach</h2>
        <p>Our educators don't just teach language; they share stories, explain customs, and help children understand why certain phrases are used in specific contexts. This holistic approach ensures that children don't just speak the language – they live it.</p>
      `,
      featured_image: '/images/blog/learning-african-languages-connects-roots.jpg',
      created_at: '2025-07-27T07:29:56.834183Z',
      updated_at: '2025-07-27T07:29:56.834183Z',
      author_name: 'Dr. Adaeze Okonkwo',
      author_bio: 'Cultural linguist and iSPEAK curriculum advisor',
      is_published: true,
      category: {
        id: '11b81e4a-cddc-4dce-9753-9b22a8f3fd4c',
        name: 'Cultural Insights',
        slug: 'cultural-insights',
        color: '#bb55d3'
      }
    },
    {
      id: '5d095afb-e4ab-43f6-98c7-81287f6aeddd',
      title: 'The Science Behind Early Language Acquisition',
      slug: 'science-early-language-acquisition',
      excerpt: 'Learn about the cognitive benefits of introducing children to multiple languages during their critical learning years.',
      content: `
        <p>Research consistently shows that the early years of a child's life represent a critical window for language acquisition. At iSPEAK, we leverage this scientific understanding to maximize learning outcomes.</p>
        
        <h2>The Critical Period</h2>
        <p>Between ages 3-14, children's brains are remarkably plastic and primed for language learning. During this period, they can acquire native-like pronunciation and intuitive grammar understanding with relative ease.</p>
        
        <h2>Cognitive Benefits</h2>
        <ul>
          <li>Enhanced executive function and problem-solving skills</li>
          <li>Improved attention control and task-switching abilities</li>
          <li>Greater cognitive flexibility and creativity</li>
          <li>Better academic performance across subjects</li>
        </ul>
        
        <h2>The iSPEAK Advantage</h2>
        <p>Our one-on-one sessions are designed to provide the consistent, meaningful interaction that research shows is crucial for language acquisition. Native speakers provide authentic input while adapting to each child's pace and learning style.</p>
      `,
      featured_image: '/images/blog/fun-games-practice-kiswahili-home.jpg',
      created_at: '2025-07-27T07:29:57.017953Z',
      updated_at: '2025-07-27T07:29:57.017953Z',
      author_name: 'Dr. Sarah Johnson',
      author_bio: 'Child development specialist and language acquisition researcher',
      is_published: true,
      category: {
        id: 'b860fb42-1de0-48d7-bd42-07492e75fd54',
        name: 'Language Learning',
        slug: 'language-learning',
        color: '#4dc9c9'
      }
    },
    {
      id: '5e2f8f59-14a7-46f8-b4ec-571261b4a0b5',
      title: 'Success Story: From Shy to Confident Global Communicator',
      slug: 'success-story-confident-communicator',
      excerpt: 'Read how 8-year-old Amara transformed from a shy student to a confident Yoruba speaker in just six months.',
      content: `
        <p>When Amara first joined iSPEAK, she was a quiet 8-year-old who barely spoke above a whisper. Her parents wanted her to connect with her Nigerian heritage, but Amara was hesitant about learning Yoruba.</p>
        
        <h2>The Journey Begins</h2>
        <p>"I was scared I would say things wrong," Amara recalls. "But my teacher, Auntie Folake, made everything fun. She taught me songs and told me stories about clever animals."</p>
        
        <h2>Building Confidence</h2>
        <p>Through patient, encouraging one-on-one sessions, Amara began to open up. Her educator used games, storytelling, and lots of positive reinforcement. Within three months, Amara was constructing full sentences and even correcting her parents' pronunciation!</p>
        
        <h2>A Transformation</h2>
        <p>Six months later, Amara confidently presented a Yoruba poem at her school's international day. "I felt so proud," she beams. "Now I can talk to my grandma in Nigeria, and she says I sound like I was born there!"</p>
        
        <h2>The Ripple Effect</h2>
        <p>Amara's success extended beyond language. Her parents report improved confidence in all areas of school, stronger family connections, and a deep pride in her cultural identity.</p>
      `,
      featured_image: '/images/blog/meet-mama-adwoa-teaching-twi.jpg',
      created_at: '2025-07-27T07:29:57.203376Z',
      updated_at: '2025-07-27T07:29:57.203376Z',
      author_name: 'iSPEAK Team',
      author_bio: 'Sharing inspiring stories from our learning community',
      is_published: true,
      category: {
        id: 'success-stories',
        name: 'Success Stories',
        slug: 'success-stories',
        color: '#10B981'
      }
    }
  ],
  categories: [
    {
      id: 'b860fb42-1de0-48d7-bd42-07492e75fd54',
      name: 'Language Learning',
      slug: 'language-learning',
      color: '#4dc9c9',
      description: 'Tips, techniques, and insights about language acquisition'
    },
    {
      id: '11b81e4a-cddc-4dce-9753-9b22a8f3fd4c',
      name: 'Cultural Insights',
      slug: 'cultural-insights',
      color: '#bb55d3',
      description: 'Exploring the rich cultural contexts of African languages'
    },
    {
      id: 'success-stories',
      name: 'Success Stories',
      slug: 'success-stories',
      color: '#10B981',
      description: 'Inspiring journeys from our iSPEAK community'
    }
  ]
}