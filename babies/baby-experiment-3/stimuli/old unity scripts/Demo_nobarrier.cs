/* Scripted by Omabu - omabuarts@gmail.com */
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using UnityEditor;

using UnityEditor.Recorder;


public class Demo : MonoBehaviour {

	public AudioSource Whoosh;

	public void PlayWhoosh() {
		Whoosh.Play();
	}

	private RecorderWindow GetRecorderWindow()
		{
				return (RecorderWindow)EditorWindow.GetWindow(typeof(RecorderWindow));
		}

	public static void DumpToConsole(object obj)
     {
         var output = JsonUtility.ToJson(obj, true);
         Debug.Log(output);
     }

	public Camera myCamero;
	private GameObject[] animal;
	private int animalIndex;
	private List<string> animationList = new List<string> {
															  "Attack",
															  "Bounce",
															  "Clicked",
															  "Death",
															  "Eat",
															  "Fear",
															  "Fly",
															  "Hit",
															  "Idle_A", "Idle_B", "Idle_C",
															  "Jump",
															  "Roll",
															  "Run",
															  "Sit",
															  "Spin/Splash",
															  "Swim",
															  "Walk"
															};
	private List<string> facialExpList = new List<string> {
															  "Eyes_Annoyed",
															  "Eyes_Blink",
															  "Eyes_Cry",
															  "Eyes_Dead",
															  "Eyes_Excited",
															  "Eyes_Happy",
															  "Eyes_LookDown",
															  "Eyes_LookIn",
															  "Eyes_LookOut",
															  "Eyes_LookUp",
															  "Eyes_Rabid",
															  "Eyes_Sad",
															  "Eyes_Shrink",
															  "Eyes_Sleep",
															  "Eyes_Spin",
															  "Eyes_Squint",
															  "Eyes_Trauma",
															  "Sweat_L",
															  "Sweat_R",
															  "Teardrop_L",
															  "Teardrop_R"
															};

	[Space(10)]
	[Tooltip("Assign: the game object where the animal are parented to")]

	public Transform animal_parent;
	public Dropdown dropdownAnimal;
	public Dropdown dropdownAnimation;
	public Dropdown dropdownFacialExp;
	List<string> animalList = new List<string>();

	// 	whether or not stims loom
	public bool loom = false;

	// 4 or 8 fam trials, or test trial
	public float num_reps = 4.0f;

	// experiment constants
	public float trial_time = 24.0f;
	public float loom_time = 0.75f;
	public float recording_time = 24.0f;
	public float loom_back_time = 0.75f;
	public float orig_to_final_ratio = 1.2f/2.0f;

	// initialize timer
 public float trial_timer = 24.0f;
 public float loom_back_timer = 0.75f;
 public float loom_timer = 0.75f;
 public float recording_timer = 24.0f;

	public float original_view;
	public float final_view;
	bool change_view;

	public GameObject rightcurtain;
	public GameObject leftcurtain;

	public GameObject rightcurtainTarget;
	public GameObject leftcurtainTarget;

	public Vector3 right_ogpos;
	public Vector3 left_ogpos;

	private float barrier_speed = 1.5f;

	RecorderWindow recorderWindow;
	void Start() {

		int count = animal_parent.childCount;
		animal = new GameObject[count];

		right_ogpos = rightcurtain.transform.position;
		left_ogpos = leftcurtain.transform.position;

		Debug.Log(right_ogpos.GetType());

		for(int i = 0; i< count; i++)
		{
			animal[i] = animal_parent.GetChild(i).gameObject;
			string n = animal_parent.GetChild(i).name;
			animalList.Add(n);
			// animalList.Add(n.Substring(0, n.IndexOf("_")));

			if(i==0) animal[i].SetActive(true);
			else animal[i].SetActive(false);
		}


		dropdownAnimal.AddOptions(animalList);
		dropdownAnimation.AddOptions(animationList);
		dropdownFacialExp.AddOptions(facialExpList);
		dropdownFacialExp.value = 1;
		ChangeExpression();

		Bounds b = animal[0].transform.GetChild(0).GetChild(0).GetComponent<Renderer>().bounds;

		recorderWindow = GetRecorderWindow();

	}

	void Update() {

			// update trial timer
			trial_timer -= Time.deltaTime;
			loom_timer -= Time.deltaTime;

			// barrier moving step
			float step =  barrier_speed * Time.deltaTime;

			for(int i = 1; i <= num_reps; i++) {
				Debug.Log("trial timer: " + trial_timer);

				Debug.Log("num reps: " + num_reps);
				Debug.Log("iterator: " + i);
				Debug.Log("trial_time: " + trial_time);

				Debug.Log("condition statement: " + (num_reps - i/2) * (trial_time/num_reps));

							if(trial_timer > (num_reps - (i - 0.5)) * (trial_time/num_reps)) { // open
								rightcurtain.transform.position = Vector3.MoveTowards(rightcurtain.transform.position, rightcurtainTarget.transform.position, step);
								leftcurtain.transform.position = Vector3.MoveTowards(leftcurtain.transform.position, leftcurtainTarget.transform.position, step);
								break;
							}
							else if (trial_timer > (num_reps - i) * (trial_time/num_reps)) { // close
								rightcurtain.transform.position = Vector3.MoveTowards(rightcurtain.transform.position, right_ogpos, step);
								leftcurtain.transform.position = Vector3.MoveTowards(leftcurtain.transform.position, left_ogpos, step);
								break;
							}
			}

			if(loom) {
				if(loom_timer > 0){
					if(change_view)
						// myCamero.fieldOfView -= Time.deltaTime*(myCamero.fieldOfView-final_view)/loom_timer;
						myCamero.fieldOfView = (loom_timer/loom_time) * original_view + (1-loom_timer/loom_time) * final_view;

				}

			if(trial_timer < loom_back_time){
				loom_back_timer -= Time.deltaTime;

				if(loom_back_timer > 0) {
					myCamero.fieldOfView = (loom_back_timer/loom_back_time) * final_view + (1-loom_back_timer/loom_back_time) * original_view;
				}
			}
		}



			if(trial_timer < 0)
         {
					 recording_timer -= Time.deltaTime;
					 recorderWindow.StopRecording();
					 change_view = false;

					 if (recording_timer  < 0)
					 {
						 NextAnimal();
						 recorderWindow.StartRecording();
						 trial_timer = trial_time;
						 recording_timer = recording_time;
						 loom_timer = loom_time;
						 loom_back_timer = loom_back_time;

					 }

         }

			// }
	}


	public void NextAnimal() {

		Whoosh.Play(0);


		if(dropdownAnimal.value >= dropdownAnimal.options.Count - 1)
			dropdownAnimal.value = 0;
		else
			dropdownAnimal.value++;

		ChangeAnimal();

	}

	public void PrevAnimal() {

		if(dropdownAnimal.value<= 0)
			dropdownAnimal.value = dropdownAnimal.options.Count - 1;
		else
			dropdownAnimal.value--;

		ChangeAnimal();
	}

	public void ChangeAnimal() {

		animal[animalIndex].SetActive(false);
		animal[dropdownAnimal.value].SetActive(true);
		animalIndex = dropdownAnimal.value;

		ChangeAnimation();
		ChangeExpression();
	}

	public void NextAnimation() {



		if(dropdownAnimation.value >= dropdownAnimation.options.Count - 1)
			dropdownAnimation.value = 0;
		else
			dropdownAnimation.value++;

		ChangeAnimation();
	}


	public void PrevAnimation() {

		if(dropdownAnimation.value<= 0)
			dropdownAnimation.value = dropdownAnimation.options.Count - 1;
		else
			dropdownAnimation.value--;

		ChangeAnimation();
	}

	public void ChangeAnimation() {

		GameObject a = animal[dropdownAnimal.value];

		float fov_size = a.GetComponent<Collider>().bounds.size[0] + a.GetComponent<Collider>().bounds.size[0];
		original_view = fov_size * 17;
		change_view = true;
		final_view = original_view * orig_to_final_ratio; // calculate final view

		rightcurtain.transform.position = right_ogpos;
		leftcurtain.transform.position = left_ogpos;

		if(loom) {
			myCamero.fieldOfView = original_view;

		}
		else{
			myCamero.fieldOfView = final_view; // if it shouldn't loom, then directly start at final size

		}

		int count = a.transform.childCount;
		for(int i = 0; i< count; i++)
		{
			if(a.GetComponent<Animator>() != null)
			{
				a.GetComponent<Animator>().speed = 0.25f;
				a.GetComponent<Animator>().Play(dropdownAnimation.options[dropdownAnimation.value].text);

			}
			else if(a.transform.GetChild(i).GetComponent<Animator>() != null)
			{
				a.transform.GetChild(i).GetComponent<Animator>().speed = 0.25f;
				a.transform.GetChild(i).GetComponent<Animator>().Play(dropdownAnimation.options[dropdownAnimation.value].text);
			}
		}
	}

	public void NextExpression() {

		if(dropdownFacialExp.value >= dropdownFacialExp.options.Count - 1)
			dropdownFacialExp.value = 0;
		else
			dropdownFacialExp.value++;

		ChangeExpression();
	}

	public void PrevExpression() {

		if(dropdownFacialExp.value<= 0)
			dropdownFacialExp.value = dropdownFacialExp.options.Count - 1;
		else
			dropdownFacialExp.value--;

		ChangeExpression();
	}

	public void ChangeExpression() {

		GameObject a = animal[dropdownAnimal.value];

		int count = a.transform.childCount;
		for(int i = 0; i< count; i++)
		{
			if(a.GetComponent<Animator>() != null)
			{
				a.GetComponent<Animator>().Play(dropdownFacialExp.options[dropdownFacialExp.value].text);
			}
			else if(a.transform.GetChild(i).GetComponent<Animator>() != null)
			{
				a.transform.GetChild(i).GetComponent<Animator>().Play(dropdownFacialExp.options[dropdownFacialExp.value].text);
			}
		}
	}

	public void GoToWebsite(string URL) {

		Application.OpenURL(URL);
	}
}
