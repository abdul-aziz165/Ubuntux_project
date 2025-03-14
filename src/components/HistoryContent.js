import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistoryContent.css"; // Import CSS for styling

const historyData = [
  {
    title: "The Rise of the Ashanti Empire",
    image: "/images/ashante.jpg",
    content: `The Ashanti Empire, also known as Asanteman, was a powerful pre-colonial West African state established by the Akan people in what is now Ghana. Emerging in 1701, it became a dominant force due to its military strength, effective war strategies, and early adoption of European firearms. At its peak, the empire spanned central Ghana, Togo, and Côte d'Ivoire, bordered by the Dagomba kingdom to the north and Dahomey to the east. Known for its sophisticated hierarchy, social structure, and rich culture, the Ashanti Empire is one of the most documented indigenous African polities by English sources. Today, the Ashanti monarchy remains a protected traditional institution within Ghana.

Origins and Formation
The Ashanti people migrated from the Niger River region after the fall of the Ghana Empire in the 13th century. By the 17th century, they settled in the forested areas around Kumasi, establishing small states. Wealth from gold trade with the Mali Empire fueled their rise. The Oyoko clan, led by Chief Oti Akenten, began consolidating Ashanti clans into a confederation, which later united against the Denkyira, a dominant regional power.

The Golden Stool
A key symbol of Ashanti unity, the Golden Stool, was introduced by Osei Tutu I, the first Asantehene (king). According to legend, it descended from the heavens, embodying the soul of the Ashanti people. The stool became a sacred symbol of the Ashanti Union, and allegiance to it solidified the empire's cohesion.

Independence and Expansion
In 1701, under Osei Tutu I and his advisor Okomfo Anokye, the Ashanti defeated the Denkyira at the Battle of Feyiase, securing independence. Through diplomacy and military campaigns, the empire expanded, incorporating neighboring states. Successors like Opoku Ware I further extended its borders, making it one of West Africa's most powerful states.

Economy and Society
The Ashanti economy thrived on gold, kola nuts, and trade with European powers, including the Portuguese, Dutch, and British. The empire's social structure was highly stratified, with a centralized government and a complex bureaucracy. The Ashanti were known for their vibrant culture, including the production of Kente cloth, a symbol of royalty.

Military and European Contact
The Ashanti army, equipped with firearms and organized into a formidable force, played a crucial role in the empire's expansion and resistance to European colonization. Despite initial trade relations, tensions with the British led to a series of Anglo-Ashanti wars in the 19th century. The Ashanti achieved notable victories, including the defeat of British forces in the First Anglo-Ashanti War (1823–1826). However, superior British firepower eventually led to their defeat in the Fourth Anglo-Ashanti War (1894–1896).

Decline and Legacy
In 1896, the British annexed Ashanti territories, exiling Asantehene Prempeh I and dissolving the empire. A final uprising in 1900, led by Queen-Mother Yaa Asantewaa, was crushed, and Ashanti leaders were exiled. The empire was formally incorporated into the British Gold Coast colony. Despite its fall, the Ashanti monarchy endures as a cultural and traditional institution in modern Ghana, symbolizing the resilience and legacy of one of Africa's most powerful empires.`,
    quizQuestions: [
      {
        question: "What was the key symbol of Ashanti unity?",
        options: ["Golden Crown", "Golden Stool", "Silver Sword", "Sacred Drum"],
        answer: "Golden Stool"
      },
      {
        question: "Who was the first Asantehene?",
        options: ["Osei Tutu I", "Opoku Ware I", "Kwame Nkrumah", "Okomfo Anokye"],
        answer: "Osei Tutu I"
      },
      {
        question: "Which war led to Ashanti independence?",
        options: ["Battle of Feyiase", "Anglo-Ashanti War", "Zulu War", "Mfecane War"],
        answer: "Battle of Feyiase"
      }
    ]
  }
];

const HistoryContent = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const toggleContent = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const startQuiz = (index) => {
    navigate("/quiz", { state: { questions: historyData[index].quizQuestions } });
  };

  return (
    <div className="history-container">
      <h1 className="history-title">Learn About African History</h1>
      <div className="history-grid">
        {historyData.map((item, index) => (
          <div key={index} className="history-card" onClick={() => toggleContent(index)}>
            <img src={item.image} alt={item.title} className="history-image" />
            <h2 className="history-card-title">{item.title}</h2>
            {expandedIndex === index && (
              <>
                <p className="history-content">{item.content}</p>
                <button className="quiz-button" onClick={() => startQuiz(index)}>
                  Take Quiz
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryContent;
