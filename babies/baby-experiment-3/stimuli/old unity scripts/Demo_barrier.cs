/* Scripted by Omabu - omabuarts@gmail.com */
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using System.Collections;
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

	// initialize fam trial as being true
	public bool fam_trial = true;

	// initialize block_over as false
	public bool block_over = false;

	// deviant or background blocks
	public bool deviant_block = true;

	// experiment constants
	private float num_fam_reps = 1.0f;
	private float time_per_fam_rep = 6.0f;
	private float test_trial_duration = 5.0f;
	private float barrier_speed = 1.5f;
	private float animation_speed = 0.2f;

	// initialize timers
	private float fam_timer;
	private float test_timer;
  private float recording_timer;
	private float original_view;

	public GameObject rightcurtain;
	public GameObject leftcurtain;

	public GameObject rightcurtainTarget;
	public GameObject leftcurtainTarget;

	public Vector3 right_ogpos;
	public Vector3 left_ogpos;

	RecorderWindow recorderWindow;
	void Start() {

		// initialize timers
	 fam_timer = num_fam_reps * time_per_fam_rep;
	 test_timer = test_trial_duration;
	 recording_timer = fam_timer + test_timer;

	 // get initial positions of curtains
	 right_ogpos = rightcurtain.transform.position;
	 left_ogpos = leftcurtain.transform.position;

		int count = animal_parent.childCount;
		animal = new GameObject[count];

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

		Debug.Log(dropdownAnimation);
		Debug.Log(dropdownAnimal);

		dropdownFacialExp.value = 1;
		ChangeExpression();

		recorderWindow = GetRecorderWindow();
		NextAnimal();
		recorderWindow.StartRecording();

	}

	void Update() {

		// turn on camera if it's not on yet
		recorderWindow = GetRecorderWindow();
		if(!recorderWindow.IsRecording()){
			recorderWindow.StartRecording();
		}

			// barrier moving step
			float step =  barrier_speed * Time.deltaTime;

			// switch to test animal for next trial
			if (fam_timer < 0 & test_timer == test_trial_duration){
				fam_trial = false;

				// go to next animal after familiarization if its a deviant block
				if (deviant_block){
					NextAnimal();
				}

			}


				// if it's a fam trial, open and close
				if (fam_trial){

					fam_timer -= Time.deltaTime;

					// loop through repetitions
					for(int i = 1; i <= num_fam_reps; i++) {


									// for the first half of the repetition, open the curtains
									if(fam_timer > (num_fam_reps - (i - 0.5)) * time_per_fam_rep) {
										rightcurtain.transform.position =
											Vector3.MoveTowards(rightcurtain.transform.position, rightcurtainTarget.transform.position, step);
										leftcurtain.transform.position =
											Vector3.MoveTowards(leftcurtain.transform.position, leftcurtainTarget.transform.position, step);
										break;
									}
									// for the second half of the repetition, close the curtains
									else if (fam_timer > (num_fam_reps - i) * time_per_fam_rep) {
										rightcurtain.transform.position =
											Vector3.MoveTowards(rightcurtain.transform.position, right_ogpos, step);
										leftcurtain.transform.position =
											Vector3.MoveTowards(leftcurtain.transform.position, left_ogpos, step);
										break;
									}
							}
				}

				// if it's a test trial, just open
				else {

					test_timer -= Time.deltaTime;

					rightcurtain.transform.position =
						Vector3.MoveTowards(rightcurtain.transform.position, rightcurtainTarget.transform.position, step);

					leftcurtain.transform.position =
						Vector3.MoveTowards(leftcurtain.transform.position, leftcurtainTarget.transform.position, step);

						}

			// once test trial is over, stop current block and get ready for next block
			if(test_timer < 0) {
			 recorderWindow.StopRecording();

			 // reset barrier positions
			 rightcurtain.transform.position = right_ogpos;
			 leftcurtain.transform.position = left_ogpos;

			 // get next animal
			 NextAnimal();

			 // reset timers
			 fam_timer = num_fam_reps * time_per_fam_rep;
			 test_timer = test_trial_duration;

			 // restart next fam trial
			 fam_trial = true;

			 Debug.Log(recorderWindow);

			 }

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

		// float fov_size = a.GetComponent<Collider>().bounds.size[0];
		// myCamero.fieldOfView = fov_size * 32;


		int count = a.transform.childCount;
		for(int i = 0; i< count; i++)
		{
			if(a.GetComponent<Animator>() != null)
			{
				a.GetComponent<Animator>().speed = animation_speed;
				a.GetComponent<Animator>().Play(dropdownAnimation.options[dropdownAnimation.value].text);

			}
			else if(a.transform.GetChild(i).GetComponent<Animator>() != null)
			{
				a.transform.GetChild(i).GetComponent<Animator>().speed = animation_speed;
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

	IEnumerator Wait() {
	 Debug.Log("Before Waiting 2 seconds");
	 yield return new WaitForSeconds(20);
	 Debug.Log("After Waiting 2 Seconds");
}


}
